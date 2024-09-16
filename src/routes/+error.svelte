<script>
  import { goto } from '$app/navigation';
  import '../app.postcss';
</script>

<svelte:head>
  <title>Qubic Card | Whoops</title>
</svelte:head>

<section class="text-white h-screen">
  <div class="container flex flex-col items-center px-5 py-8 mx-auto">
    <div class="flex flex-col w-full mb-12 text-left lg:text-center">
      <h1
        class="mx-auto mb-12 text-4xl font-semibold leading-none tracking-tighter lg:w-1/2 sm:text-6xl title-font"
      >
        Whoops!
      </h1>
      <p
        class="mx-auto text-base font-medium leading-relaxed text-neutral-400 lg:w-1/2"
      >
        Nothing to see here ... maybe the page is no longer available, sorry
        about that :(
      </p>
      <button
        on:click={() => goto('/')}
        class="inline-flex items-center justify-center w-full px-8 py-3 mt-6 font-medium text-white transition duration-500 ease-in-out transform bg-primary-500 border border-transparent rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Go back home
      </button>
    </div>
  </div>
</section>
