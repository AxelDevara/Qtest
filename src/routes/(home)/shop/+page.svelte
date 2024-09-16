<script>
  import catalog from '@lib/product/catalog.json';
  import OrderCardSection from '@pages/orderCardSection.svelte';
  import { homepageImage } from '@lib/constants';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { referral } from '@lib/stores/referralStore';

  onMount(() => {
    if ($page.url.searchParams.get('ref'))
      $referral = $page.url.searchParams.get('ref');
  });

  let banner =
    'https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/Card+Homepage/Qubic+Banner+Without+Text.png';
</script>

<svelte:head>
  <title>Official Shop</title>
  <meta
    name="description"
    content="Produk Qubic dapat dibeli melalui official store kami. Dapatkan penawaran menarik melalui sosial media Qubic."
  />
  <meta itemprop="image" content={homepageImage.whiteLogo} />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Official Shop" />
  <meta
    itemprop="description"
    content="Produk Qubic dapat dibeli melalui official store kami. Dapatkan penawaran menarik melalui sosial media Qubic."
  />
  <meta itemprop="image" content={homepageImage.whiteLogo} />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Official Shop" />
  <meta
    property="og:description"
    content="Produk Qubic dapat dibeli melalui official store kami. Dapatkan penawaran menarik melalui sosial media Qubic."
  />
  <meta property="og:image" content={homepageImage.whiteLogo} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Official Shop" />
  <meta
    name="twitter:description"
    content="Produk Qubic dapat dibeli melalui official store kami. Dapatkan penawaran menarik melalui sosial media Qubic."
  />
  <meta name="twitter:image" content={homepageImage.whiteLogo} />
  <meta name="robots" content="index, follow" />
</svelte:head>

<!-- <DiscountBanner text="Get 15% off using the code 15OFF" /> -->

<div class="min-h-screen text-white bg-black flex flex-col p-4 md:p-12">
  <div
    class="w-full rounded-md h-[350px] lg:h-[400] flex flex-col justify-center items-center bg-center bg-cover"
    style={`background-image: url('${banner}')`}
  >
    <h1 class="font-light text-5xl lg:text-7xl text-center">
      GET SPECIAL PRICE
    </h1>
    <h2 class="text-xl lg:text-2xl mt-3 text-neutral-500 uppercase">
      For every custom orders
    </h2>
    <div
      class=" max-w-lg w-2/3 flex justify-center items-center p-1 mt-8 rounded-sm"
    >
      <a
        href="https://api.whatsapp.com/send/?phone=628113087599&text&app_absent=0"
        class="text-xl bg-blue-600 w-full text-center lg:text-md text-white px-2 py-2 rounded-sm "
        >Contact Us</a
      >
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
    <OrderCardSection
      data={catalog.METAL[912321932931]}
      on:click={() => goto(`/shop/metal`)}
      section="METAL"
    />
    <OrderCardSection
      on:click={() => goto(`/shop/metal-white`)}
      data={catalog.METAL[912321932932]}
      section="METAL"
    />
    <OrderCardSection
      on:click={() => goto(`/shop/metal-brushedred`)}
      data={catalog.METAL[912321932933]}
      section="METAL-RED"
    />
    <OrderCardSection
      on:click={() => goto(`/shop/metal-brushedblack`)}
      data={catalog.METAL[912361932992]}
      section="METAL-BLACK"
    />
    <OrderCardSection
      on:click={() => goto(`/shop/pvc`)}
      data={catalog.PVC[912321932935]}
      section="PVC"
    />
    <OrderCardSection
      on:click={() => goto(`/shop/tap`)}
      data={catalog.QUBICTAP[912321932936]}
      section="tap"
    />
  </div>
</div>
