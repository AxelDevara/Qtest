<script lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui';
  import catalog from '@lib/product/catalog.json';
  import { removeItem } from '@lib/stores/cartStore';
  import { goto } from '$app/navigation';

  export let cart;

  const toCheckoutPage = () => goto('/shop/checkout');
</script>

<Popover class={`h-full w-32 ${$$props.class}`}>
  <PopoverButton
    class="flex items-center bg-white justify-evenly text-center text-black font-medium w-full"
  >
    <img src="/carticon.png" alt="cart" style="width: 25px; height: 25px;" />
    <p>Cart</p>
    <div class="h-5 w-7 pb-6 text-black border border-zinc-500 rounded">
      {cart.length}
    </div></PopoverButton
  >

  <PopoverPanel
    class="absolute bottom-[70px] border rounded left-0 lg:left-2 text-black z-30 bg-white shadow-md w-full lg:w-[800px] h-auto max-h-[90vh] lg:max-h-[550px] overflow-y-auto p-2"
  >
    {#if cart.length <= 0}
      <p class="text-black text-lg">No item</p>
    {:else}
      {#each cart as item, i}
        <div class="flex w-full justify-between mb-2">
          <p class="flex-1 ml-4 md:ml-2">
            {catalog[item.type][item.id]['name']}
          </p>
          <div
            on:click={() => removeItem(i)}
            class="cursor-pointer border text-black justify-center rounded px-2 flex items-center"
          >
            x
          </div>
        </div>
      {/each}
    {/if}
  </PopoverPanel>
</Popover>
