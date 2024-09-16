<script>
  import { homepageImage } from "@lib/constants";
  import { toastFailed } from "@lib/utils/toast";
  import Spinner from "@comp/loading/spinner.svelte";
  import { fade } from "svelte/transition";
  import { cart, removeItem } from "@lib/stores/cartStore";

  export let nextStep;
  export let loading;

  const calcTotal = () => {
          let totalPrice = 0;
          let res = $cart.map((cart) => {
            return totalPrice += cart.product.price * 1;
          });
          return new Intl.NumberFormat('id', {
                currency: 'IDR',
                style: 'currency',
              }).format(res);
        }

  let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<div class="w-full md:p-4" in:fade={{ duration: 300 }}>
  {#if $cart.length > 0}
    {#each $cart as item, i}
      <div
        class="flex flex-col-reverse md:flex-row justify-between h-auto md:h-60 p-6 mt-4 w-full"
      >
        <div class="flex relative flex-col rounded-lg md:flex-row">
          <div
            class={`absolute flex flex-row w-full h-44 md:h-full ${
              item.product.color === "Black"
                ? "text-gray-100"
                : item.product.color === "Gloss White"
                ? "text-neutral-900"
                : "text-gray-400"
            }`}
          >
            <div
              class={`self-end ${
                innerWidth < 400 ? "mb-7" : innerWidth < 430 ? "mb-0" : "mb-4"
              } ml-4`}
            >
              <p class="font-bold text-md md:text-lg truncate">
                {item.firstName ?? ""}
                {item.lastName ?? ""}
              </p>
              <p class="text-md md:text-lg truncate">{item.company ?? " "}</p>
            </div>
          </div>
          <img
            src={item.product.type === "Tap"
              ? homepageImage.tapHand
              : item.product.color === "Gloss White"
              ? homepageImage.pvcWhiteCard
              : item.product.color === "Silver"
              ? homepageImage.whiteLogo
              : item.product.color === "Black"
              ? homepageImage.blackLogo
              : homepageImage.metalRedCard}
            alt="card"
            class="w-auto max-w-82"
          />
          <div class="ml-0 md:ml-4 text-neutral-400 flex flex-col flex-wrap">
            <h1 class="text-2xl font-bold text-white">#{i + 1}</h1>
            <p>Finishing: {item.product.finishing ?? "-"}</p>
            <p>Printed Name: {item.firstName ?? "-"} {item.lastName ?? "-"}</p>
            <p>Type: {item.product.type ?? "-"}</p>
            <p>Color: {item.product.color ?? "-"}</p>
            <p>Material: {item.product.material ?? "-"}</p>
          </div>
        </div>
        <div
          on:click={() => removeItem(i)}
          class="cursor-pointer bg-white text-black rounded px-2 flex items-center justify-center self-end md:self-start mb-4 md:mb-0"
        >
          x
        </div>
      </div>
    {/each}
    <div class="flex justify-end">
      <p>
        Total: {calcTotal()}
      </p>
    </div>
  {:else}
    <div class="flex flex-col h-full w-full">
      <div class="text-center text-neutral-400">
        <p class="text-xl font-bold">Your cart is empty</p>
        <p>Please add some items to your cart to continue to checkout</p>
      </div>
    </div>
  {/if}
</div>

<button
  class="bg-blue-600 hover:border-neutral-200 hover:border text-white p-4 w-full rounded-md flex justify-center items-center mt-8 md:mt-0"
  on:click={$cart.length > 0 ? nextStep : toastFailed("Your cart is empty")}
>
  {#if loading}
    <div class="flex flex-row">
      <Spinner class="h-5 w-5 pr-2 border-black mr-4" /> Loading...
    </div>
  {:else}
    Delivery
  {/if}
</button>
