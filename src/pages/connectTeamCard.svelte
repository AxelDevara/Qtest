<script>
  import Spinner from '@comp/loading/spinner.svelte';
  import supabase from '@lib/db';
  import CenterModal from '@comp/modals/centerModal.svelte';
  import { toastFailed, toastSuccess } from '@lib/utils/toast';
  import { goto } from '$app/navigation';
  import {
    encryptActivationCode,
    logCardActivationMsg,
    logMsg,
  } from '@lib/query/activate';
  import { logActivationTeam } from '@lib/qubic-core/logger';
  import { fade } from 'svelte/transition';
  import Input from '@comp/input.svelte';

  export let teamName, cardId, members, teamId, teamLogo;

  let showModal = false;
  let selected = {
    email: '',
    mid: '',
    fname: '',
    lname: '',
  };
  let state = {
    success: false,
    verified: false,
    step: 1,
    codeActivation: '',
  };
  let loading = false;

  const toggleModal = () => (showModal = !showModal);

  const connectCardHandler = async () => {
    loading = true;
    const { data, error } = await supabase.from('team_cardcon').insert(
      {
        card_id: cardId,
        team_member_id: selected.mid,
        status: true,
        display_personal: true,
      }
      // {
      //   returning: 'minimal',
      // }
    );

    if (error) {
      console.log(error);
      toastFailed('Failed to connect card, please contact our support');
      loading = false;
    } else {
      await logActivationTeam(
        logCardActivationMsg(cardId, selected.email),
        cardId,
        parseInt(selected.mid),
        teamId,
        `${selected.fname} ${selected.lname}`
      );

      toggleModal();
      loading = false;
      state.success = true;

      setTimeout(() => {
        state.step = 1;
      }, 500);

      setTimeout(() => {
        state.step = 2;
      }, 1000);

      setTimeout(() => {
        state.step = 3;
      }, 2000);

      setTimeout(() => {
        goto('/qbc/' + cardId + '?type=Preview');
      }, 2500);
    }
  };

  const codeActivationHandler = async () => {
    try {
      loading = true;
      const { data, error } = await supabase
        .from('teams')
        .select('team_token')
        .eq('id', teamId);
      if (error) console.log(error);
      if (data) {
        const hash = await encryptActivationCode(state.codeActivation);
        if (hash === data[0].team_token) {
          state.verified = true;
          toastSuccess(`Welcome to ${teamName} team, Connect your card now!`);
        } else {
          toastFailed('Invalid, Please try again.');
        }
      }
      state.codeActivation = '';
      loading = false;
    } catch (error) {
      toastFailed();
      loading = false;
    }
  };

  const onEnter = async (e) => {
    if (e.charCode === 13) {
      await codeActivationHandler();
    }
  };

  const uniqueMembers = members.filter(
    (member, index, self) =>
      index ===
      self.findIndex(
        (m) => m.member_id === member.member_id && m.email === member.email
      )
  );
</script>

<div
  class="flex flex-col gap-2 min-h-screen items-center justify-between py-6 md:py-12 "
>
  {#if state.success}
    <div class="flex w-full min-h-screen items-center gap-4">
      <Spinner class="w-12 h-12" />
      {#if state.step === 1}
        <h1 class="text-sm w-full" in:fade|local>
          Processing your request, please wait...
        </h1>
      {:else if state.step === 2}
        <h1 class="text-sm w-full" in:fade|local>
          Connecting card to <span class="font-bold">{selected.email}</span>...
        </h1>
      {:else}
        <h1 class="text-sm w-full" in:fade|local>
          Card successfully connected to <span class="font-bold"
            >{selected.email}</span
          >
        </h1>
      {/if}
    </div>
  {:else}
    <img src="/qubicteamswhite.webp" alt="" class="h-10 md:h-12" />

    {#if state.verified}
      <div class="flex flex-col items-center gap-2 w-full">
        {#if teamLogo}
          <img
            src={teamLogo}
            alt=""
            class="rounded-md w-20 md:w-32 h-20 md:h-32 mb-6"
          />
        {/if}
        <h1 class="text-2xl font-bold">{teamName}</h1>
        <h2 class="text-md text-neutral-500">Connect this card to a member</h2>

        <div
          class="flex flex-col divide-y divide-neutral-700 outline outline-1 outline-neutral-700 rounded-md w-full justify-center items-center"
        >
          <h1 class="bg-neutral-800 text-neutral-400 p-2 w-full text-center">
            Select a member
          </h1>
          {#each uniqueMembers as member}
            <button
              class="text-white p-2 w-full text-center cursor-pointer text-xs md:text-sm hover:text-neutral-300"
              on:click={() => {
                toggleModal();
                selected.email = member.email;
                selected.mid = member.member_id;
                selected.fname = member.team_profile.firstname;
                selected.lname = member.team_profile.lastname;
              }}
            >
              {member.email}
            </button>
            <CenterModal
              {showModal}
              class="h-[30%] p-4"
              on:action={toggleModal}
            >
              <div class="flex justify-between">
                <h1 class="text-lg font-bold">Are you sure ?</h1>
                <button
                  class="text-white text-2xl font-bold"
                  on:click={toggleModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p class="text-neutral-400 text-xs md:text-sm">
                This card will be connected to <span class="font-bold"
                  >{selected.email}</span
                > profile.
              </p>
              <p class="text-neutral-400 text-xs md:text-sm">
                Any permissions or changes about this card can be managed by {teamName}'s
                Superadmin.
              </p>
              <div class="flex flex-col gap-2">
                <button
                  on:click={toggleModal}
                  class="outline outline-1 outline-neutral-700 rounded-md p-2 hover:outline-neutral-500"
                  >Cancel</button
                >
                <button
                  disabled={loading}
                  class="bg-blue-600 rounded-md p-2 flex justify-center items-center gap-2"
                  on:click={connectCardHandler}
                >
                  {#if loading}
                    <Spinner class="w-7 h-7" />
                  {/if} Connect Card</button
                >
              </div>
            </CenterModal>
          {/each}
        </div>
      </div>
    {:else}
      <div class="flex flex-col gap-2 w-full max-w-xs">
        <h1 class=" text-xs text-neutral-400">Connecting to</h1>
        <h1 class=" font-medium text-xl mb-6">{teamName}</h1>
        <input
          on:keypress={onEnter}
          type="password"
          placeholder="Enter team code"
          bind:value={state.codeActivation}
          class="p-3 rounded-md bg-neutral-800 text-white"
        />
        <button
          class="bg-blue-600 rounded-md p-2"
          on:click={codeActivationHandler}
        >
          Submit
        </button>
      </div>
    {/if}
    <button
      class="outline outline-1 outline-neutral-700 hover:outline-neutral-500 p-2 rounded-md md:text-sm text-xs"
      on:click={() =>
        window.open('https://wa.me/628113087599', '_blank').focus()}
    >
      Contact us
    </button>
  {/if}
</div>
