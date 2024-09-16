<script>
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  const toShop = () => goto('/shop');
</script>

<div
  class="flex flex-col items-center w-full bg-black pt-32"
  in:fade={{ duration: 300 }}
>
  <h1 class="text-lg">Thank you for ordering at Qubic Shop.</h1>
  <h2 class="text-neutral-300">Please check your email for your order details.</h2>
  <div class="flex w-full mt-32">
    <button
      class="bg-neutral-600 hover:border-neutral-200 hover:border rounded-md text-white p-4 lg:mr-4 w-full"
      on:click={toShop}>Back to shop</button
    >
  </div>
</div>
