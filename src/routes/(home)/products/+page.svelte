<script>
  import HowItWorks from '@pages/homepageSections/howItWorks.svelte';
  import Hero from '@pages/homepageSections/hero.svelte';
  import Typecard from '@pages/homepageSections/typecard.svelte';
  import ForYouOnlyYou from '@pages/homepageSections/forYouOnlyYou.svelte';
  import WhyUsingQubic from '@pages/homepageSections/whyUsingQubic.svelte';
  import Faq from '@pages/homepageSections/faq.svelte';
  import HighEnd from '@pages/homepageSections/highend.svelte';
  import Digitalized from '@pages/homepageSections/digitalized.svelte';
  let y;
</script>

<svelte:head>
  <title>Products</title>
  <link rel="canonical" href="https://qubic.id/products" />
  <meta
    name="description"
    content="Qubic menyediakan berbagai macam produk dengan teknologi NFC dan QR. Ketahui berbagai macam produk Qubic yang sesuai dengan usahamu."
  />
  <meta name="robots" content="index, follow" />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Products" />
  <meta
    itemprop="description"
    content="Qubic menyediakan berbagai macam produk dengan teknologi NFC dan QR. Ketahui berbagai macam produk Qubic yang sesuai dengan usahamu."
  />
  <meta
    itemprop="image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/Card+Editor/black+card+logo+black.png"
  />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic Card | Products" />
  <meta
    property="og:description"
    content="Qubic menyediakan berbagai macam produk dengan teknologi NFC dan QR. Ketahui berbagai macam produk Qubic yang sesuai dengan usahamu."
  />
  <meta
    property="og:image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/Card+Editor/black+card+logo+black.png"
  />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic Card | Products" />
  <meta
    name="twitter:description"
    content="Qubic menyediakan berbagai macam produk dengan teknologi NFC dan QR. Ketahui berbagai macam produk Qubic yang sesuai dengan usahamu."
  />
  <meta
    name="twitter:image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/Card+Editor/black+card+logo+black.png"
  />
</svelte:head>

<svelte:window bind:scrollY={y} />

<div class="max-w-[100%] bg-black min-h-screen overflow-hidden">
  <Hero />
  <Digitalized />
  <Typecard {y} />
  <HighEnd />
  <WhyUsingQubic />
  <ForYouOnlyYou />
  <HowItWorks />
  <Faq />
</div>
