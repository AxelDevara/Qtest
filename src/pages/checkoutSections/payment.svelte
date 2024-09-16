<script>
  import supabase from '@lib/db';
  import { fade } from 'svelte/transition';
  import {
    cart,
    shippingDetails,
    deleteAllCart,
    xenditCart,
    deleteXenditCart,
  } from '@lib/stores/cartStore';
  import Spinner from '@comp/loading/spinner.svelte';
  import { rajaOngkir } from '@lib/stores/rajaOngkirStore';
  import { referral } from '@lib/stores/referralStore';
  import { toastFailed } from '@lib/utils/toast';

  export let prevStep;
  export let nextStep;
  let generating = false;
  let totalPrice = 0;
  let shippingCost =
    $rajaOngkir.results[0]['costs'][
      $shippingDetails.city === 'Surabaya' ? 0 : 1
    ]['cost'][0].value;
  let discCode = '';
  let discData;
  let isReferralCodeAvailable = null;

  $cart.map((cart) => {
    totalPrice += cart.product.price * 1;
  });

  const generateInvoice = async () => {
    generating = true;
    const url =
      'https://53qgo5igvzegph65ujqh3cxtbu0qrrfw.lambda-url.ap-southeast-1.on.aws/';

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        firstname: $shippingDetails.firstname,
        lastname: $shippingDetails.lastname,
        amount: discData
          ? totalPrice + shippingCost - (totalPrice * discData?.amount) / 100
          : totalPrice + shippingCost,
        email: $shippingDetails.email,
        mobile_number: $shippingDetails.phone,
        delivery: {
          fee: shippingCost,
          city: $shippingDetails.city,
          country: 'Indonesia',
          postal_code: $shippingDetails.postalCode,
          state: $shippingDetails.province,
          street: $shippingDetails.address,
        },
        cart: $xenditCart,
        discount: discData ? ((totalPrice * discData?.amount) / 100) * -1 : 0,
        discount_code: discData?.code,
        ref: $referral ?? '',
      }),
    });
    generating = false;
  };

  const getReferral = async () => {
    if ($referral.length > 0) {
      const { data, error } = await supabase
        .from('referral')
        .select('id')
        .eq('ref_code', $referral);

      if (error) console.log(error);

      if (data) {
        if (data[0].id) {
          isReferralCodeAvailable = true;
          return true;
        } else {
          isReferralCodeAvailable = false;
          return false;
        }
      }
    } else {
      return true;
    }
  };

  const getDiscount = async () => {
    let { data, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', discCode);

    if (data) {
      discData = data[0];
    }

    if (error) {
      toastFailed('Code invalid');
      console.log(error);
    }
  };
</script>

<div
  class="flex flex-col items-center w-full bg-black"
  in:fade={{ duration: 300 }}
>
  <div
    class="flex flex-col rounded-xl min-h-[500px] w-full text-white m-8 mt-4 md:mt-12 p-5"
  >
    <div class="flex flex-col h-full font-bold text-lg mt-8">
      {#each $cart as cart}
        <div class="flex flex-col md:flex-row w-full mb-4">
          <h1 class="flex-1">{cart.product.name}</h1>
          <div class="flex">
            <h3 class="text-neutral-400 mr-16">1 x</h3>
            <h3 class="text-white">
              {new Intl.NumberFormat('id', {
                currency: 'IDR',
                style: 'currency',
              }).format(cart.product.price)}
            </h3>
          </div>
        </div>
      {/each}
      <div class="flex flex-col items-end w-full mt-4">
        <div class="grid grid-cols-2">
          <h1 class="text-neutral-400">Delivery</h1>
          <h3 class="text-white">
            {new Intl.NumberFormat('id', {
              currency: 'IDR',
              style: 'currency',
            }).format(shippingCost)}
          </h3>
          {#if discData}
            <h1 class="text-neutral-400">{discData.code}</h1>
            <h3 class="text-green-500">
              -{new Intl.NumberFormat('id', {
                currency: 'IDR',
                style: 'currency',
              }).format(
                discData.fixed
                  ? discData.amount
                  : (totalPrice * discData.amount) / 100
              )}
            </h3>
          {/if}
          <h1 class="text-neutral-400">Total</h1>
          <h3 class="text-white">
            {new Intl.NumberFormat('id', {
              currency: 'IDR',
              style: 'currency',
            }).format(
              discData
                ? totalPrice +
                    shippingCost -
                    (discData.fixed
                      ? discData.amount
                      : (totalPrice * discData.amount) / 100)
                : totalPrice + shippingCost
            )}
          </h3>
        </div>
      </div>
      <div
        class="py-4 border-t border-neutral-700 mt-8 text-neutral-300 flex flex-col"
      >
        <label class="text-base" for="referral">Referral Code</label>
        <input
          id="referral"
          type="text"
          class="border-2 border-neutral-600 mt-3 p-2 bg-neutral-700"
          placeholder="Referral code (Optional)"
          bind:value={$referral}
          on:change={getReferral}
        />
        {#if isReferralCodeAvailable}
          <p class="text-green-500">Referral code is available!</p>
        {:else if isReferralCodeAvailable === false}
          <p class="text-red-500">Referral code is not available!</p>
        {/if}
        <label class="mt-4 text-base" for="disc">Discount Code</label>
        <input
          id="disc"
          type="text"
          class="border-2 border-neutral-600 mt-3 p-2 bg-neutral-700"
          placeholder="Discount code (Optional)"
          bind:value={discCode}
          on:change={getDiscount}
        />
      </div>
    </div>
  </div>
  <div class="flex w-full">
    <button
      class="bg-neutral-600 hover:bg-neutral-500 hover:border-neutral-200 hover:border rounded-md text-white p-4 mr-4 w-full"
      on:click={prevStep}>Back</button
    >
    <button
      class="bg-blue-600 hover:border-neutral-200 rounded-md hover:border text-white p-4 w-full flex justify-center items-center"
      on:click={async () => {
        if (!generating) {
          await generateInvoice();
          deleteAllCart();
          deleteXenditCart();
          nextStep();
        }
      }}
    >
      {#if generating}
        <div class="flex flex-row">
          <Spinner class="h-5 w-5 pr-2 border-black mr-4" /> Loading...
        </div>
      {:else}
        Place Order
      {/if}</button
    >
  </div>
</div>
