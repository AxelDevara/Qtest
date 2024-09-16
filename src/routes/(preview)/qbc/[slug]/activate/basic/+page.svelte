<script>
  import { user } from "@lib/stores/userStore";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import supabase from "@lib/db";
  import ActivateCard from "@pages/activateCard.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { onMount } from "svelte";
  import { toastFailed, toastSuccess } from "@lib/utils/toast";
  import { encryptActivationCode } from "@lib/query/activate";
  import Spinner from "@comp/loading/spinner.svelte";

  let cardId = $page.params.slug;
  let state = "card";
  let activationCode = "";
  let activationInput;
  let isLoading = false;
  const redirectToProfilePreview = () =>
    goto("/qbc/" + cardId + "?type=Preview");

  const checkCardConnected = async () => {
    const { data, error } = await supabase
      .from("card_connection")
      .select("id")
      .eq("card_id", cardId);

    if (error) return false;
    if (data) {
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkActivationCode = async () => {
    if (activationCode === "") {
      toastFailed("Please enter activation code");
    } else {
      isLoading = true;
      let hashActivationCode = await encryptActivationCode(activationCode);

      const { error, data } = await supabase
        .from("teams")
        .select("team_token")
        .eq("team_token", hashActivationCode);

      if (error) console.log(error);
      if (data.length > 0) {
        toastSuccess("Activation code is valid");
        state = "card";
        isLoading = false;
      } else {
        toastFailed("Activation code is invalid");
        isLoading = false;
      }
    }
  };

  const checkCardExists = async () => {
    const { data, error } = await supabase
      .from("business_cards")
      .select("id")
      .eq("id", cardId);

    console.log("data",data)
    if (error) return false;
    if (data) {
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  let checkCard = checkCardExists();

  const onKeyPress = async (e) => {
    if (e.charCode === 13) {
      await checkActivationCode();
    }
  };

  onMount(async () => {
    if (await checkCardConnected()) {
      redirectToProfilePreview();
    }
  });
</script>

<svelte:head>
  <title>Qubic Card | Activation</title>
</svelte:head>

{#await checkCard}
  <div class="w-full h-screen flex justify-center items-center">
    <div class="w-14 h-14">
      <Spinner />
    </div>
  </div>
{:then res}
  {#if res}
    <div
      class="bg-black bg-[url(/polka.png)] flex mx-auto justify-center items-center min-h-screen"
    >
      <SvelteToast />
      {#if state == "codeActivation"}
        <!-- HIDDEN -->
        <div
          class="bg-black h-screen text-white w-full md:w-1/4 hidden flex-col justify-center p-8"
        >
          <h1 class="font-bold text-4xl">Basic</h1>
          <div
            class={`${
              $user === null
                ? "mt-20 md:mt-32 lg:mt-48 mb-16 md:mb-28"
                : "mt-8 md:mt-16 lg:mt-28 mb-10 md:mb-20"
            }`}
          >
            <h2 class="text-xl">Enter the activation code</h2>
          </div>
          <input
            bind:this={activationInput}
            on:keypress={onKeyPress}
            type="password"
            class="bg-neutral-700 p-2 text-neutral-100 rounded-md w-full mb-2"
            bind:value={activationCode}
            placeholder="Enter the activation code"
          />
          <button
            disabled={isLoading}
            on:click={checkActivationCode}
            class="flex justify-between w-full p-4 rounded-md mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 hover:bg-black "
          >
            {#if isLoading}
              <Spinner class="w-6 h-6" />
            {/if} Submit <span class="text-lg">&#8594;</span></button
          >
        </div>
      {:else}
        <ActivateCard />
      {/if}
    </div>
    {:else}
    <div class="w-full h-screen flex justify-center items-center">
      <p class="text-lg text-white">Invalid card</p>
    </div>
  {/if}
{/await}
