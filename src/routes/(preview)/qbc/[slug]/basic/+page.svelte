<script>
  import Profile from "@pages/profile.svelte";
  import supabase from "@lib/db";
  import { onMount } from "svelte";
  import { toastSuccess, toastFailed } from "@lib/utils/toast";
  import { page } from "$app/stores";
  import AuthWrapper from "@comp/auth/authWrapper.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { user } from "@lib/stores/userStore";
  import { logTap } from "@lib/qubic-core/logger";
  import getUserEmail from "@lib/query/getUserEmail";
  import CenterModal from "@comp/modals/centerModal.svelte";
  import { goto } from "$app/navigation";

  let profileData;
  let cardSubEnded;
  let cardError = false;
  let profileError = false;
  let isLoading = true;
  let linkExpired = true;
  let code;
  let cardData;
  let renewing = false;
  let isOpen = true;
  let isSecondModalOpen = false;
  let modalTitle;

  // New Card Modal
  let isModalLoading = false;
  let resendSuccess = false;

  const getCardData = async () => {
    let { data } = await supabase
      .from("card_connection")
      .select("id,uid, subs_end")
      .eq("card_id", $page.params.slug)
      .eq("status", true);

    if (data) {
      cardData = data[0];
    } else {
      cardError = true;
      return;
    }
  };

  const getProfile = async () => {
    // let { data: validData, isValid } = await validateURL();
    await getCardData();
    if (cardData) {
      const endDate = new Date(cardData["subs_end"]);
      const today = new Date(Date.now());
      if (endDate < today) {
        cardSubEnded = true;
      } else {
        let { data } = await supabase
          .from("profile")
          .select("*")
          .eq("uid", cardData.uid);

        if (data) {
          profileData = data[0];
          return;
        } else {
          profileError = true;
          return;
        }
      }
    } else {
      cardError = true;
      return;
    }
  };

  const pageGuard = () => {
    switch ($page.url.searchParams.get("type")) {
      case "QRScan":
        return true;
      case "QRShare":
        return true;
      case "NFC":
        return true;
      case "Preview":
        return true;
      default:
        return false;
    }
  };

  const renew = async () => {
    if (!renewing) {
      renewing = true;
      const today = new Date();
      today.setFullYear(today.getFullYear() + 1);
      const { data, error } = await supabase
        .from("renewal_code")
        .select("used")
        .eq("code", code)
        .eq("used", false);
      if (data) {
        await supabase
          .from("card_connection")
          .update({ subs_end: today.toISOString().split("T")[0] })
          .eq("id", cardData["id"]);

        await supabase
          .from("renewal_code")
          .update({ used: true })
          .eq("code", code);

        toastSuccess("Renewal succesful, please refresh this page");
      } else {
        code = "";
        toastFailed("Code not recognized");
      }
    }
    renewing = false;
  };

  onMount(async () => {
    if (pageGuard()) {
      const encryptTime = $page.url.searchParams.get("thash");
      const now = Math.floor(new Date().getTime() / 1000);

      if (encryptTime) {
        // @ts-ignore
        now > encryptTime ? (linkExpired = true) : (linkExpired = false);
      }
      if (linkExpired) {
        isLoading = false;
        return;
      }
      await getProfile();
    } else {
      cardError = true;
    }

    if (profileData || cardError || profileError) {
      isLoading = false;
    }

    if (!cardError || !profileError)
      logTap(
        $page.url.searchParams.get("type"),
        $page.params.slug,
        cardData?.uid,
      );
  });

  const isDateEqual = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getTime() === d2.getTime();
  };
</script>

<svelte:head>
  <title>Qubic Profile</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<AuthWrapper>
  <SvelteToast />

  {#if cardSubEnded}
    <div
      class="bg-black bg-[url(/polka.png)] flex mx-auto justify-center items-center min-h-screen"
    >
      <div
        class="bg-neutral-900 h-screen justify-center flex-col items-center flex text-center text-white w-full md:w-96 text-lg"
      >
        <p>{"Your subscription has expired 😔"}</p>
        <p class="text-neutral-200 text-sm my-2">
          Please enter your renewal code here
        </p>
        <input
          bind:value={code}
          class="bg-neutral-800 rounded-md px-2 py-2"
          type="text"
          id="code"
          name="code"
        />
        <button
          class="px-3 w-1/2 py-2 text-sm mt-4 bg-blue-600 rounded-md"
          on:click={() => (renewing ? {} : renew())}
          >{renewing ? "working..." : "Renew Subscription"}</button
        >
        <button
          class="px-3 py-2 w-1/2 text-sm mt-2 bg-neutral-600 rounded-md"
          on:click={() => goto("https://wa.me/628113087599")}>Contact Us</button
        >
      </div>
    </div>
  {:else}
    {#if profileData}
      {#if isDateEqual(profileData.created_at, profileData.last_updated)}
        <CenterModal showModal={isOpen} class="py-4 px-4">
          {#await getUserEmail(profileData?.uid) then res}
            {#if isSecondModalOpen}
              <div
                class="w-full h-full text-white flex flex-col gap-2 justify-around p-2"
              >
                <h1 class="font-bold text-3xl" bind:this={modalTitle}>
                  Known issues
                </h1>
                <ul class="list-disc text-sm mt-2 mb-3 pl-4">
                  <li class=" text-neutral-300">
                    I can't sign in. Please confirm the email we sent to <span
                      class="font-bold">{res.email.user}</span
                    >.
                  </li>
                  <li class="text-neutral-300">
                    I activated onto the wrong email. Please contact our support
                    at working hours from 9 AM - 5 PM
                  </li>
                </ul>

                <div class="flex flex-col gap-2">
                  <button
                    class="w-full p-3 flex justify-between outline outline-1 outline-neutral-700 mt-1 text-sm hover:bg-neutral-900 rounded-md"
                    on:click={() =>
                      window.open("https://wa.me/628113087599").focus()}
                    >I haven't received any emails <span>→</span></button
                  >
                  <button
                    class="w-full p-3 flex justify-between outline outline-1 outline-neutral-700 mt-1 text-sm hover:bg-neutral-900 rounded-md"
                    on:click={() =>
                      window.open("https://wa.me/628113087599").focus()}
                    >Emergency issue <span>→</span></button
                  >
                </div>
              </div>
            {:else}
              <div
                class="w-full h-full text-sm text-white flex flex-col gap-2 justify-around"
              >
                <h1 class="font-bold text-3xl mt-2" bind:this={modalTitle}>
                  Wait a bit!
                </h1>
                <div class="flex flex-col gap-2">
                  <p class="mt-2 text-neutral-300">
                    The owner of this card hasn't made any changes! Please come
                    back later
                  </p>
                  <p class="mb-4">Are you the owner?</p>
                </div>
                <div class="flex flex-col gap-2 mb-2">
                  <button
                    class="w-full p-3 flex justify-between outline outline-1 outline-neutral-700 hover:bg-neutral-900 rounded-md"
                    on:click={() => window.open("https://editor.qubic.id")}
                    >Start editing through the editor <span>→</span></button
                  >
                  <button
                    class="w-full p-3 flex justify-between outline outline-1 outline-neutral-700 hover:bg-neutral-900 rounded-md"
                    on:click={() => {
                      isSecondModalOpen = true;
                    }}
                  >
                    I'm facing a problem <span>→</span></button
                  >
                  <button
                    class="{resendSuccess
                      ? 'text-green-600'
                      : ''} w-full p-3 flex justify-between outline outline-1 outline-neutral-700 hover:bg-neutral-900 rounded-md"
                    on:click={async () => {
                      if (!resendSuccess || !isModalLoading) {
                        try {
                          isModalLoading = true;
                          await supabase.auth.signInWithOtp({
                            email: res.email.user,
                            options: {
                              shouldCreateUser: false,
                              emailRedirectTo: "https://editor.qubic.id",
                            },
                          });
                          resendSuccess = true;
                          toastSuccess("Please check your email");
                        } catch (error) {
                          toastFailed(error.message);
                        }
                      }
                    }}
                  >
                    {resendSuccess
                      ? "Please check your email"
                      : "Resend confirmation email"} <span>→</span></button
                  >
                </div>
              </div>
            {/if}
          {/await}
        </CenterModal>
      {/if}
    {/if}

    <div
      class="bg-black bg-[url(/polka.png)] flex mx-auto justify-center items-center min-h-screen"
    >
      {#if $user && profileData}
        {#if $user.id == profileData.uid}
          <div
            on:click={() => window.open("https://editor.qubic.id")}
            class="z-40 bg-blue-600 fixed w-full bottom-0 text-white py-2 text-center"
          >
            Edit Profile →
          </div>
        {/if}
      {/if}
      {#if isLoading || profileData}
        <Profile
          {isLoading}
          class="min-h-screen min-w-md max-w-md w-full"
          data={profileData?.metadata}
          profileUid={profileData?.uid}
          cardId={$page.params.slug}
        />
      {:else if profileError && !isLoading}
        <div
          class="bg-neutral-900 h-screen justify-center items-center flex flex-col text-center text-white w-full md:w-96 text-lg"
        >
          <h1 class="font-bold text-2xl">404</h1>
          <h2>Qubic Profile not found</h2>
        </div>
      {:else if cardError}
        <div
          class="bg-neutral-900 h-screen justify-center items-center flex flex-col text-center text-white w-full md:w-96 text-lg"
        >
          <h1 class="font-bold text-2xl">404</h1>
          <h2>Page not found</h2>
        </div>
      {:else if !isLoading && linkExpired}
        <div class="flex flex-col max-w-md px-6">
          <img
            width="48px"
            height="48px"
            class="p-2 text-white bg-white rounded-lg"
            src="https://img.icons8.com/fluency-systems-regular/96/000000/lock-2.png"
            alt="denied"
          />
          <p class="text-white text-xl pt-2 font-bold">Link Expired</p>
          <p class="text-neutral-300 text-sm pt-3">
            Please tap the card again. This is a part of our security feature to
            ensure that the card owner's data is safe and only viewable through
            card interaction
          </p>
        </div>
      {/if}
    </div>
  {/if}
</AuthWrapper>
