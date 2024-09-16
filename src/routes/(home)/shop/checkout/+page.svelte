<script>
  import Review from '@pages/checkoutSections/review.svelte';
  import Delivery from '@pages/checkoutSections/delivery.svelte';
  import Payment from '@pages/checkoutSections/payment.svelte';
  import Finish from '@pages/checkoutSections/finish.svelte';

  let active = 1;

  let loading = false;
  let innerWidth = 0;

  const nextStep = () => {
    loading = true;
    setTimeout(() => {
      loading = false;
      active = active + 1;
    }, 500);
  };

  const prevStep = () => (active = active - 1);
</script>

<svelte:window bind:innerWidth />
<div class="flex justify-center items-center min-h-screen text-white">
  <div
    class={`flex flex-col justify-center items-center p-8 ${
      innerWidth < 768 ? 'w-full' : innerWidth < 1285 ? 'w-4/5' : 'w-1/2'
    }`}
  >
    <div
      class="hidden md:flex w-full border border-neutral-700 p-4 rounded-md items-center justify-evenly"
    >
      <p
        class={`text-lg mr-2 ${
          active === 1 ? 'font-bold text-white' : 'text-neutral-300'
        } ${
          active === 2 || active === 3 || active === 4
            ? 'text-green-400 font-bold'
            : ''
        }`}
      >
        Cart
      </p>
      <hr class="bg-white w-24" />
      <p
        class={`text-lg mx-2 ${
          active === 2 ? 'font-bold text-white' : 'text-neutral-300'
        } ${active === 3 || active === 4 ? 'text-green-400 font-bold' : ''}`}
      >
        Delivery
      </p>
      <hr class="bg-white w-24" />
      <p
        class={`text-lg mx-2 ${
          active === 3 ? 'font-bold text-white' : 'text-neutral-300'
        } ${active === 4 ? 'text-green-400 font-bold' : ''}`}
      >
        Review
      </p>
      <hr class="bg-white w-24" />
      <p
        class={`text-lg ml-2 ${
          active === 4 ? 'font-bold text-white' : 'text-neutral-300'
        }`}
      >
        Finish
      </p>
    </div>
    <div
      class="flex md:hidden border border-neutral-700 rounded-md mb-10 w-full p-4 text-xl font-bold"
    >
      {active === 1
        ? 'Review Cart'
        : active === 2
        ? 'Delivery'
        : active === 3
        ? 'Payment'
        : 'Finish'}
    </div>
    {#if active === 1}
      <Review {nextStep} {loading} />
    {:else if active === 2}
      <Delivery {nextStep} {prevStep} {loading} />
    {:else if active === 3}
      <Payment {prevStep} {nextStep} />
    {:else if active === 4}
      <Finish {nextStep} {prevStep} />
    {/if}
  </div>
</div>
