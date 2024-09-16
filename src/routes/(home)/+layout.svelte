<script>
  // throw new Error(
  //   '@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)'
  // );

  import '../../app.postcss';
  import { page } from '$app/stores';
  import { cart } from '@lib/stores/cartStore';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import AuthWrapper from '@comp/auth/authWrapper.svelte';
  import CartButton from '@comp/buttons/cartButton.svelte';
  import { blur } from 'svelte/transition';
    import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui';

  let isSidebarOpened = false;
  export let data;
  let { url } = data;

  const handleOpenSidebar = () => (isSidebarOpened = !isSidebarOpened);
</script>

<nav
  class="sticky top-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-white antialiased border-b border-neutral-700"
>
  <div class="px-4">
    <div class="flex items-center justify-between h-16">
      <span class="flex align-middle content-center">
        <a href="/"
          ><img
            class="h-16 pr-4 border-r border-neutral-700 w-28"
            src="/qubic.svg"
            alt="Qubic"
          /></a
        >
        <div
          class="lg:flex hidden ml-10 justify-center items-center space-x-10  text-sm"
        >
          <a href="/products"> Products </a>
          <a href="/teams"> Teams </a>
          <a href="/analytics"> Analytics </a>
          <div class="relative">
            <Popover style="position: relative;">
              <PopoverButton>Contact Us</PopoverButton>
            
              <PopoverPanel class="bg-black p-2 rounded-md outline outline-1 mt-3 outline-neutral-800" style="position: absolute; z-index: 10;">
                <div class="panel-contents space-y-2 flex flex-col">
                  <a class="hover:text-neutral-500" target="_blank" rel="noreferrer" href="https://wa.me/628113087599">Whatsapp</a>
                  <a class="hover:text-neutral-500" href="mailto:support@qubic.id">Email</a>
                  <a class="hover:text-neutral-500" href="tel:+628113087599">Phone</a>
                </div>
            
              </PopoverPanel>
            </Popover>
          </div>
        </div>
      </span>
      <div class="flex h-full">
        <a
          class="lg:hidden border-neutral-700 border-r border-l px-4 flex justify-center items-center bg-white text-black font-medium"
          href="/shop">Get Yours</a
        >
        <button
          class="rounded-lg lg:hidden focus:outline-none focus:shadow-outline ml-2"
          on:click={handleOpenSidebar}
        >
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            {#if !isSidebarOpened}
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            {:else}
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            {/if}
          </svg>
        </button>
      </div>

      <div class="hidden lg:flex space-x-3 h-full ">
        <a
          class="border-neutral-700-500 flex items-center border-r border-l px-4 bg-white text-black font-medium"
          href="/shop">Get Yours</a
        >
        <button
          class="px-4 w-28"
          on:click={() =>
            window.open('https://editor.qubic.id', '_blank').focus()}
          >Editor</button
        >
      </div>
    </div>
  </div>
</nav>

{#if $cart.length > 0}
  {#if ($page.url.pathname.includes('/shop') && !$page.url.pathname.includes('checkout')) || $page.route.id === ''}
    <nav
      class="fixed border-t border-neutral-700 bottom-0 w-full z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-white antialiased"
    >
      <div class="px-4">
        <div class="flex items-center justify-between h-16">
          <CartButton cart={$cart} class="flex" />
          <a
            class="bg-blue-600 rounded-md p-2 w-44 md:w-56 lg:w-64 text-center"
            href="/shop/checkout">Checkout</a
          >
        </div>
      </div>
    </nav>
  {/if}
{/if}

{#if isSidebarOpened}
  <nav
    class="{isSidebarOpened
      ? 'block'
      : 'hidden'} w-full h-screen bg-white fixed z-50 flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto"
  >
    <a
      class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      href="/shop"
      on:click={handleOpenSidebar}>Get Yours</a
    >
    <a
      class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      href="https://editor.qubic.id"
      on:click={() => window.open('https://editor.qubic.id', '_blank').focus()}
      >Editor</a
    >
    <a
      class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      href="/products"
      on:click={handleOpenSidebar}>Products</a
    >
    <a
      class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      href="/teams"
      on:click={handleOpenSidebar}>Teams</a
    >
    <a
      class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      href="/analytics"
      on:click={handleOpenSidebar}>Analytics</a
    >
    <a
      class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      href="/pages/contactus"
      on:click={handleOpenSidebar}>Contact Us</a
    >
  </nav>
{/if}

<AuthWrapper>
  <SvelteToast />
  {#key url}
    <div
      in:blur={{ duration: 600 }}
      out:blur={{ duration: 600 }}
      class="relative"
    >
      <slot />
    </div>
  {/key}
</AuthWrapper>

<footer class="antialiased border-t border-neutral-700 bg-black">
  <div class="max-w-7xl mx-auto px-4 py-12 text-white">
    <div class="flex my-8">
      <div class="flex flex-col items-center md:items-start w-full gap-3">
        <h2 class="font-bold">PAYMENT POWERED BY</h2>
        <img src="/xendit.png" alt="logo xendit" class="w-24" />
      </div>
    </div>
    <div class="flex md:flex-row flex-col justify-between my-8">
      <div
        class="flex text-sm text-neutral-400 flex-col text-center md:text-left mb-5 md:mb-0"
      >
        <h1 class="font-bold text-lg text-white mb-2 md:mb-1">Our pages</h1>
        <a href="/aboutus">About Us</a>
        <a href="/pages/collaborations">Collaborations</a>
        <a href="/pages/privacy">Privacy Policy</a>
        <a href="/pages/terms">Terms of Service</a>
      </div>
      <div
        class="flex flex-col text-sm text-neutral-400 text-center md:text-left mb-5 md:mb-0"
      >
        <h1 class="font-bold text-lg mb-2 text-white md:mb-1">Our products</h1>
        <a href="/shop/metal">Metal Black</a>
        <a href="/shop/metal-white">Metal White</a>
        <a href="/shop/metal-brushedred">Metal Brushed Red</a>
        <a href="/shop/pvc">PVC</a>
        <a href="/shop/tap">Tap</a>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-col gap-2">
          <h2 class="font-bold text-center md:text-left">Social Media</h2>
          <div class="flex justify-center space-x-6 text-white">
            <a href="https://www.instagram.com/qubic.id/"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class=" fill-current text-gray-200"
                width="24"
                height="24"
                ><path fill="none" d="M0 0h24v24H0z" /><path
                  d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z"
                /></svg
              ></a
            >
            <a href="https://wa.me/628113087599"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class=" fill-current text-gray-200"
                width="24"
                height="24"
                ><path fill="none" d="M0 0h24v24H0z" /><path
                  d="M7.253 18.494l.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-8-8c0 1.436.377 2.813 1.084 4.024l.422.724-.653 2.401 2.4-.655zM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308c.134-.01.269-.01.403-.004.054.004.108.01.162.016.159.018.334.115.393.249.298.676.588 1.357.868 2.04.062.152.025.347-.093.537a4.38 4.38 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268.12.116.237.235.363.346.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.06.004.121.015.177.04.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265.004.067.01.175-.013.373-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302 2.378 2.378 0 0 1-.33.288 3.71 3.71 0 0 1-.125.09 5.024 5.024 0 0 1-.383.22 1.99 1.99 0 0 1-.833.23c-.185.01-.37.024-.556.014-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1z"
                /></svg
              ></a
            >
            <a href="https://shopee.co.id/shop/717657308/">
              <img src="/shopee.svg" alt="" class="w-8 h-8" />
            </a>
            <a href="https://www.tokopedia.com/qubicid">
              <img
                src="/tokopedia.svg"
                alt=""
                class="w-10 h-10 -translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <span
      class="text-white text-sm font-light mt-5 mb-8 flex justify-center md:justify-start"
      >© 2021 Qubic</span
    >
  </div>
</footer>

