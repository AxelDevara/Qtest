<script>
  import supabase from "@lib/db";
  import { onMount } from "svelte";
  import { location } from "@lib/stores/userStore";
  import { page } from "$app/stores";
  import { toastSuccess, toastFailed } from "@lib/utils/toast";
  import AuthWrapper from "@comp/auth/authWrapper.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { logTapTeam } from "@lib/qubic-core/logger";
  import getUserEmail from "@lib/query/getUserEmail";
  import convertToGMT7 from "@lib/utils/convertToGMT7";
  import CenterModal from "@comp/modals/centerModal.svelte";
    import Profile from "@pages/profile.svelte";

  let error = false;
  let isLoading = true;
  let linkExpired = true;
  let isTeamProfileExist = true;
  let isTeamCardConExist = true;
  let isSubsEnd = false;
  let memberProfileData;
  let cardData;
  let teamData;
  let modalTitle;
  let isSecondModalOpen = false;
  let profileEmailAuth = null;

  // New Card Modal
  let isModalLoading = false;
  let resendSuccess = false;

  const getMemberTeamData = async () => {
    let { data, error } = await supabase
      .from("team_cardcon")
      .select(
        "card_id, team_member_id(*, team_id(*)), status, display_personal"
      )
      .eq("card_id", $page.params.slug)
      .eq("status", true);

    if (error) {
      console.log(error);
    }
    // 613572e9-f471-4f0d-90d2-d8511d1ac462
    // bec89896-55b3-4e5a-b66f-01bd1aa4b5e9
    if (data) {
      if (data.length > 0) {
        if (data[0].team_member_id.uid === null) {
          isTeamProfileExist = false;
        } else {
          cardData = data[0];
          teamData = data[0]?.team_member_id?.team_id;
          memberProfileData = data[0]?.team_member_id;
        }
      }
    } else {
      isTeamProfileExist = false;
      isTeamCardConExist = false;
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

  const isDateEqual = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getTime() === d2.getTime();
  };

  const getLocation = (holder) => {
    const geolocationOptions = {
      enableHighAccuracy: true,
    };
    const successCallback = async (position) => {
      $location = position.coords;
      await logTapTeam(
        $page.url.searchParams.get("type"),
        cardData?.card_id, 
        memberProfileData?.id,
        teamData?.id,
        holder,
        position
      );
    };

    const errorCallback = async (error) => {
      await logTapTeam(
        $page.url.searchParams.get("type"),
        cardData?.card_id,
        memberProfileData?.id,
        teamData?.id,
        holder,
        null
      );
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        geolocationOptions
      );
    }
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

      await getMemberTeamData();
      if (!cardData) {
        isTeamCardConExist = false;
        isLoading = false;
        return;
      }

      isLoading = false;
    } else {
      error = true;
    }

    if (
      new Date().getTime() >
      convertToGMT7(teamData?.subscription_end_date).getTime()
    ) {
      isSubsEnd = true;
      isLoading = false;
      return;
    }

    if (
      memberProfileData ||
      error ||
      !isTeamProfileExist ||
      !isTeamCardConExist
    ) {
      isLoading = false;
    }

    let holder =
      memberProfileData?.team_profile?.firstname +
      " " +
      memberProfileData?.team_profile?.lastname;

    if (!error) {
      getLocation(holder);
    }
    console.log(error)
  });
</script>

<svelte:head>
  <title>Qubic Profile</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<AuthWrapper>
  <SvelteToast />

  {#if isDateEqual(memberProfileData?.member_from, memberProfileData?.last_updated)}
    <CenterModal showModal={true} class="h-[55%] md:h-[35%]">
      {#await getUserEmail(memberProfileData?.uid) then res}
        {#if isSecondModalOpen}
          <div
            class="w-full h-full text-white flex flex-col gap-2 justify-around p-2"
          >
            <h1 class="font-bold text-3xl" bind:this={modalTitle}>
              Known issues
            </h1>
            <ul class="list-disc text-sm mt-2 pl-4">
              <li class="mb-2">
                I can't sign in. Please confirm the email we sent to <span
                  class="font-bold">{res.auth.user}</span
                >.
              </li>
              <li>
                I activated onto the wrong email. Please contact our support at
                working hours from 9 AM - 5 PM
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
            <h1 class="font-bold text-3xl" bind:this={modalTitle}>
              Wait a bit!
            </h1>
            <div class="flex flex-col gap-2">
              <p class="mt-2">
                The owner of this card hasn't made any changes! Please come back
                later
              </p>
              <p class="font-bold">Are you the owner?</p>
            </div>
            <div class="flex flex-col gap-2">
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
                        email: profileEmailAuth,
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
                  : "Resend confirmation email"}<span>→</span></button
              >
            </div>
          </div>
        {/if}
      {/await}
    </CenterModal>
  {/if}

  <!-- {#if isProfileVerified === false}
    {#if isEmailVerifiedModal}
      <CenterModal
        showModal={isEmailVerifiedModal}
        class="h-[30%] md:h-[22%]"
        on:action={() => (isOpen = true)}
      >
        <div class="w-full h-full text-white flex flex-col justify-between p-2">
          <h1 class="text-md" bind:this={modalTitle}>
            Please confirm the email we sent to <span class="font-bold"
              >{profileEmailAuth ?? ""}</span
            >.
          </h1>
          <div class="flex flex-col gap-2">
            <button
              class="w-full flex justify-between p-3 outline outline-1 outline-neutral-700 mt-1 text-sm hover:bg-neutral-900 rounded-md"
              on:click={() => window.open("https://wa.me/628113087599").focus()}
              >I haven't received any emails <span>→</span>
            </button>
            <button
              class="w-full flex justify-between p-3 outline outline-1 outline-neutral-700 mt-1 text-sm hover:bg-neutral-900 rounded-md"
              on:click={() => window.open("https://wa.me/628113087599").focus()}
              >Emergency issue <span>→</span></button
            >
          </div>
        </div>
      </CenterModal>
    {/if}
  {/if} -->

  <div
    class="bg-black bg-[url(/polka.png)] flex mx-auto justify-center items-center min-h-screen"
  >
    {#if isSubsEnd}
      <div
        class="bg-neutral-900 h-screen justify-center items-center flex text-center text-white w-full md:w-96 text-lg"
      >
        Subscription expired
      </div>
    {:else if isTeamProfileExist === false || isTeamCardConExist === false}
      <div
        class="bg-neutral-900 h-screen justify-center items-center flex flex-col text-center text-white w-full md:w-96 text-lg"
      >
        <h1 class="font-bold text-2xl">404</h1>
        <h2>Qubic Profile not found</h2>
      </div>
    {:else if error && !isLoading}
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
    {:else if isLoading || memberProfileData}
      <Profile
        {isLoading}
        isTeam
        class="min-h-screen min-w-md max-w-md w-full"
        data={memberProfileData?.team_profile}
        profileUid={memberProfileData?.uid}
        cardId={$page.params.slug}
        memberId={memberProfileData?.id}
        isDisplayPersonal={memberProfileData?.display_personal}
        {teamData}
      />
    {/if}
  </div>
</AuthWrapper>
