<script>
  import supabase from "@lib/db.js";
  import Spinner from "@comp/loading/spinner.svelte";
  import { toastSuccess, toastFailed } from "@lib/utils/toast";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let theme = "black";
  let loading = false;
  let email = "";
  let password = "";
  let isForgotPassword = false;

  const handleLogin = async () => {
    if (password.length < 8) {
      toastFailed("Password must be at least 8 characters");
      return;
    } else {
      try {
        const today = new Date();
        today.setFullYear(today.getFullYear() + 1);
        loading = true;
        const { data: user, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        const { data, error: con_err } = await supabase
          .from("card_connection")
          .insert([
            {
              uid: user.user.id,
              card_id: $page.params.slug,
              subs_end: today.toISOString().split("T")[0],
            },
          ]);

        setTimeout(
          async () => await goto("/qbc/" + $page.params.slug + "/" + "onboard"),
          2000,
        );

        if (error) throw error;
        if (con_err) throw con_err;

        toastSuccess("Welcome Back!");
        loading = false;
      } catch (error) {
        toastFailed(error.message);
        loading = false;
      }
    }
  };

  const forgotPassword = () => {
    isForgotPassword = !isForgotPassword;
  };

  const handleForgotPassword = async () => {
    try {
      loading = true;
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toastSuccess("Check your email!");
      loading = false;
    } catch (error) {
      toastFailed();
      loading = false;
    }
  };

  const onKeyPress = async (e) => {
    if (e.charCode === 13) {
      await handleLogin();
    }
  };
</script>

<section class="flex py-4 min-h-screen">
  <div
    class="lg:w-1/3 w-full rounded-lg border {theme == 'black'
      ? 'bg-black'
      : 'bg-white'} border-neutral-700 px-16 py-32 my-auto mx-6 md:mx-14 lg:mx-auto"
  >
    <a href="/" class="flex items-center w-32 mb-4 font-medium md:mb-0">
      <img
        src={theme == "black" ? "/qubic.svg" : "/qubiclogoblack.svg"}
        alt=""
      />
    </a>
    <h1
      class="mt-6 text-2xl font-semibold {theme == 'black'
        ? 'text-white'
        : 'text-black'} tracking-tighter text-left sm:text-3xl title-font"
    >
      {isForgotPassword ? "We got you!" : "Hi, Welcome Back!"}
    </h1>
    <div class="mt-6">
      <div>
        <p
          class="block text-sm font-medium leading-relaxed tracking-tighter text-left text-gray-400"
        >
          Email Address
        </p>
        <input
          bind:value={email}
          type="email"
          name=""
          id=""
          placeholder="Your Email "
          class="w-full px-4 rounded py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent {theme ==
          'black'
            ? 'text-white bg-neutral-700'
            : 'text-black bg-neutral-300'}  focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
        />
        {#if !isForgotPassword}
          <p
            class="block text-sm font-medium leading-relaxed mt-3 tracking-tighter text-left text-gray-400"
          >
            Password
          </p>
          <input
            on:keypress={async (e) => await onKeyPress(e)}
            bind:value={password}
            type="password"
            name=""
            id=""
            placeholder="Your Password "
            class="w-full rounded px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent {theme ==
            'black'
              ? 'text-white bg-neutral-700'
              : 'text-black bg-neutral-300'} focus:border-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
          />
        {/if}
      </div>

      {#if !loading}
        {#if isForgotPassword}
          <button
            on:click={async () => await handleForgotPassword()}
            class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 hover:bg-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
            >Send Email</button
          >
        {:else}
          <button
            disabled={loading}
            on:click={async () => await handleLogin()}
            class="block w-full px-4 py-3 mt-6 rounded font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 hover:bg-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
            >Log In</button
          >
        {/if}
      {:else}
        <Spinner class="h-8 w-8 mx-auto my-6" />
      {/if}

      <p
        class="mt-3 {theme == 'black'
          ? 'text-neutral-400'
          : 'text-neutral-600'} cursor-pointer"
        on:click={forgotPassword}
      >
        {isForgotPassword ? "Back" : "Forgot password?"}
      </p>

      <p
        class="mt-3 {theme == 'black'
          ? 'text-neutral-400'
          : 'text-neutral-600'}"
      >
        Don't have a card? Get <a
          class="underline {theme == 'black' ? 'text-white' : 'text-black'}"
          href="/shop">one</a
        > now!
      </p>

      <h1
        class="cursor-pointer w-full rounded-md mt-2 text-neutral-600 underline hover:text-neutral-800"
        on:click={() => window.open("https://teams.qubic.id").focus()}
      >
        Qubic Teams
      </h1>
    </div>
  </div>
</section>
