<script>
  import { toastSuccess } from '@lib/utils/toast';
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@rgossiaux/svelte-headlessui';
  import { createEventDispatcher } from 'svelte';

  export let teamMemberData, isHaveTeams, isLoading;

  let selectedTeam = null;
  const dispatch = createEventDispatcher();
  const update = (e) => {
    selectedTeam = e.detail;
    toastSuccess(
      `Your profile data from ${
        e.detail === 'basic' ? 'Basic' : e.detail.team_id.name
      } has been chosen to share`
    );
    dispatch('update', e.detail);
  };

  const discard = () => {
    selectedTeam = null;
    dispatch('discard', null);
  };
</script>

<Listbox value={selectedTeam} on:change={update} class="z-50">
  <ListboxButton
    on:click
    class="text-left border bg-black text-white  flex items-center justify-between border-neutral-300 rounded-md w-full z-50 "
  >
    <h1
      class={`p-3 rounded-md text-xs md:text-md ${
        selectedTeam !== null
          ? 'w-[95%]'
          : 'w-full hover:bg-neutral-900 hover:border-neutral-500'
      }`}
    >
      Connecting as {selectedTeam === null
        ? 'Teams?'
        : selectedTeam.team_id.name}
    </h1>
    {#if selectedTeam !== null}
      <span
        on:click={discard}
        class="border text-xs md:text-md border-neutral-200 p-1 w-8 rounded-md flex justify-center items-center mx-2"
        >x</span
      >
    {/if}
  </ListboxButton>
  <ListboxOptions
    class="absolute border border-neutral-300 rounded-md w-[91%] mt-2 shadow-md bg-white"
  >
    {#if isLoading}
      <h1 class="p-3 text-xs md:text-md">Loading...</h1>
    {:else if isHaveTeams}
      {#each teamMemberData as member}
        <ListboxOption
          value={member}
          class="p-3 text-xs md:text-md cursor-pointer hover:bg-black bg-white z-50 rounded-md hover:text-white"
        >
          {member?.team_id?.name}
        </ListboxOption>
      {/each}
    {:else}
      <div class="p-3 text-xs md:text-md">You don't have any team yet.</div>
    {/if}
  </ListboxOptions>
</Listbox>
