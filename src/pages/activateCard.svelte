<script>
  import { user } from '@lib/stores/userStore';
  import BorderButton from '@comp/buttons/borderButton.svelte';

  import Login from './login.svelte';
  import Register from './register.svelte';
  import AuthWrapper from '@comp/auth/authWrapper.svelte';
  import supabase from '@lib/db';
  import { page } from '$app/stores';
  import Spinner from '@comp/loading/spinner.svelte';
  import { goto } from '$app/navigation';
  import { toastFailed } from '@lib/utils/toast';

  let state = 'Idle';
  let alert;
  let isLoading = false;
  let isAgree = false;
  let hasRead = false;

  const handleActiveCard = async () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 1);
    if (isAgree && hasRead) {
      try {
        isLoading = true;
        const { data, error } = await supabase
          .from('card_connection')
          .insert([{ uid: $user.id, card_id: $page.params.slug, subs_end: today.toISOString().split('T')[0] }]);
        if (error) throw error;
        alert = 'success';
        isLoading = false;
        setTimeout(
          async () => await goto('/qbc/' + $page.params.slug + '/' + 'onboard'),
          1000
        );
        isLoading = false;
      } catch (err) {
        console.log(err);
        alert = err.message;
        isLoading = false;
      }
    } else {
      toastFailed('Please agree to our conditions');
    }
  };
  const handleStateChange = (newState) => {
    state = newState;
  };
  // $: console.log($user);
  const handleLogout = async () => await supabase.auth.signOut();
</script>

<AuthWrapper>
  {#if state == 'Idle'}
    <div class="text-white max-w-lg mx-auto px-4 h-auto">
      <p class="text-3xl font-bold">Hello!</p>

      {#if $user != null}
        <p>
          You are currently signed as <span
            class="underline text-green-300 font-bold text-lg"
            >{$user.email ?? ''}</span
          >
        </p>
        <button
          class="p-2 rounded-md h-16 mt-4 border border-neutral-800 bg-black w-full hover:bg-neutral-900"
          on:click={handleLogout}
          >Change Account <span class="text-lg text-green-300">&#8594;</span
          ></button
        >
        <div class="flex flex-col text-gray-400 my-6">
          <label class="cursor-pointer">
            <input
              class="cursor-pointer"
              type="checkbox"
              bind:checked={isAgree}
            />
            I have verified that the account above is correct and that this card
            will <span class="underline text-green-300">connect</span> to the email
            above.
          </label>
          <label class="cursor-pointer">
            <input
              class="cursor-pointer"
              type="checkbox"
              bind:checked={hasRead}
            />
            I have read the
            <a class="underline text-green-300" href="/pages/privacy"
              >Privacy Policy</a
            >
            and
            <a class="underline text-green-300" href="/pages/terms"
              >Terms of Service</a
            >.
          </label>
        </div>
        <BorderButton
          on:click={() => (isLoading ? null : handleActiveCard())}
          class="bg-blue-600 hover:bg-blue-700 outline-0 rounded-md mt-4 w-full"
        >
          {#if isLoading}
            <Spinner class="w-6 h-6 mx-auto my-4" />
          {:else}
            <p class="p-4 font-bold text-lg">Activate Card</p>
          {/if}
        </BorderButton>
        {#if alert}
          <p class="text-neutral-400 py-3">{alert}</p>
        {/if}
      {:else}
        <p class="text-neutral-400">
          Let's activate this card and get connected to others. <br /> Which one
          are you?
        </p>
        <p
          class="bg-neutral-800 p-3 ml-6 mt-2 cursor-pointer"
          on:click={() => handleStateChange('Login')}
        >
          I already have a Qubic account
        </p>
        <p
          class="bg-neutral-800 p-3 ml-6 mt-1 cursor-pointer"
          on:click={() => handleStateChange('Register')}
        >
          I don't have an account yet
        </p>
      {/if}
    </div>
  {:else if state == 'Register'}
    <div class="w-full h-auto">
      <Register />
    </div>
  {:else if state == 'Login'}
    <div class="w-full h-auto">
      <Login />
    </div>
  {/if}
</AuthWrapper>
