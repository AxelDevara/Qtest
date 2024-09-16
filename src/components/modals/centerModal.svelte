<script>
  import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
  import { createEventDispatcher } from 'svelte';

  export let showModal = false;

  const action = () => dispatch('action');
  const toggleModal = () => {
    showModal = !showModal;
    action();
  };
  const dispatch = createEventDispatcher();
</script>

{#if showModal}
  <Dialog
    open={showModal}
    on:close={() => {
      showModal = false;
    }}
    class="fixed inset-0 z-50 overflow-y-auto flex justify-center items-end md:items-center overflow-x-hidden"
  >
    <DialogOverlay
      class="fixed inset-0 bg-black opacity-30 z-10"
      on:click={toggleModal}
    />
    <div
      class="flex flex-col justify-between bg-neutral-800 text-white w-full md:w-1/2 lg:w-[30%] {$$props.class} p-2 z-40 rounded-md"
    >
      <slot />
    </div>
  </Dialog>
{/if}
