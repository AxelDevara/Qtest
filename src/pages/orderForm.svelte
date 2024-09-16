<script>
  import {
    addCart,
    addCartForXendit,
    xenditCart,
  } from '@lib/stores/cartStore.js';
  import Input from '@comp/input.svelte';
  import { goto } from '$app/navigation';
  import { toastFailed, toastSuccess } from '@lib/utils/toast';
  import catalog from '@lib/product/catalog.json';
  import { page } from '$app/stores';

  export let cardType, cardId, cardImage, isTextGray800, isTextGray400;

  let modeChoice = 'Personal';
  let fname = '';
  let lname = '';
  let company = '';

  let product = null;

  if (catalog[cardType][cardId].id == cardId) {
    product = catalog[cardType][cardId];
  }

  let basePrice = parseInt(catalog[cardType][cardId]['price']) ?? 250000;
</script>

<div
  class="lg:flex bg-black min-h-screen border-t-2 border-neutral-700"
  id="shop"
>
  <div
    class="flex items-center justify-center w-full px-6 py-8 lg:h-128 lg:w-1/2"
  >
    <!-- Forms -->
    <div class="w-full max-w-xl">
      <div class="mx-auto pb-10">
        <h1 class="text-2xl font-bold text-center uppercase">
          Create Your Card
        </h1>
        <br />
        <form>
          <Input
            bind:value={fname}
            maxlength="16"
            title="First Name"
            placeholder="First Name"
            isEmptyChecking={true}
            inputbg="bg-neutral-700"
            inputText="text-neutral-100"
          />
          <Input
            bind:value={lname}
            maxlength="16"
            title="Last Name"
            placeholder="Last Name (Optional)"
            inputbg="bg-neutral-700"
            inputText="text-neutral-100"
          />
          <Input
            bind:value={company}
            maxlength="26"
            title="Company Name / Title / Position"
            placeholder="Company Name / Title / Position (Optional)"
            inputbg="bg-neutral-700"
            inputText="text-neutral-100"
          />
        </form>
        <!-- End of Form -->

        <!-- Total Price -->
        <div
          class="mt-6 mb-4 border-b-2 border-neutral-700 mx-auto opacity-40"
        />
        <div class="flex flex-row">
          <p class="flex-grow">Price</p>
          <!-- format string to rupiah currency -->
          <p>
            {new Intl.NumberFormat('id', {
              currency: 'IDR',
              style: 'currency',
            }).format(basePrice)}
          </p>
        </div>
        <div class="hidden flex-row">
          <p class="flex-grow">{modeChoice + ' Type'}</p>
          <p>
            {new Intl.NumberFormat('id', {
              currency: 'IDR',
              style: 'currency',
            }).format(basePrice)}
          </p>
        </div>
        <div class="hidden flex-row">
          <p class="flex-grow">Total</p>
          <p class=" text-green-400">
            {new Intl.NumberFormat('id', {
              currency: 'IDR',
              style: 'currency',
            }).format(basePrice)}
          </p>
        </div>

        <div
          class="mt-6 mb-4 border-b-2 border-neutral-700 mx-auto opacity-40"
        />
        <!-- End of Total Price -->
        <!-- on:click={handleSubmit} -->
        <button
          on:click={() => {
            if (fname === '') {
              toastFailed('Please fill required field');
            } else {
              addCartForXendit({
                name: product.name,
                quantity: 1,
                price: basePrice,
                category: product.category,
                url: product.url,
                print_name: fname + ' ' + lname,
                print_company: company,
              });
              addCart({
                type: cardType,
                id: cardId,
                firstName: fname,
                lastName: lname,
                company: company,
                product: product,
              });
              toastSuccess('Successfully added to cart');
            }
          }}
          class=" py-3 bg-blue-600 hover:bg-gray-800 text-white mx-auto w-full"
          >Add to cart</button
        >
        <div class="flex justify-between w-full space-x-3 mt-3">
          <button
            class="p-3 w-1/2 text-white underline"
            on:click={() => goto('https://www.tokopedia.com/qubicid')}
            >Get via Tokopedia</button
          >
          <button
            class="underline p-3 w-1/2 text-white"
            on:click={() => goto('https://shopee.co.id/shop/717657308/')}
            >Get via Shopee</button
          >
        </div>
      </div>
    </div>
  </div>
  <!-- End of Forms -->
  <!-- Card -->
  <div class="w-full pb-20 my-auto md:mx-0 lg:w-1/2 lg:h-auto">
    <div
      id="card"
      class={`flex md:max-w-none max-w-xs bg-contain bg-no-repeat mx-auto ${
        isTextGray800
          ? 'text-gray-800'
          : isTextGray400
          ? 'text-gray-400'
          : 'text-gray-400'
      }`}
      style={`background-image: url(${cardImage})`}
    >
      <div class="self-end mb-20 md:mb-6 ml-6">
        <p class="font-bold text-xl md:text-3xl">
          {fname + ' ' + lname}
        </p>
        <p class="text-lg md:text-xl">{company ?? ' '}</p>
      </div>
    </div>
    <p class=" mt-4 text-center text-neutral-400 max-w-md mx-auto">
      This simulation is not the exact quality of the actual product
    </p>
  </div>
  <!-- End of Card -->
</div>

<style>
  #card {
    width: 427px;
    height: 270px;
  }
</style>
