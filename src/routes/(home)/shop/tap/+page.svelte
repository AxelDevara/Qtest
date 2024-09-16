<script>
  import { addCart, addCartForXendit } from '@lib/stores/cartStore.js';
  import { toastSuccess } from '@lib/utils/toast';
  import catalog from '@lib/product/catalog.json';

  let cardType = 'QUBICTAP';
  let cardId = 912321932936;
  let product = null;

  if (catalog[cardType][cardId].id == cardId) {
    product = catalog[cardType][cardId];
  }
</script>

<svelte:head>
  <title>Qubic Tap</title>
  <meta
    name="description"
    content="Qubic tap adalah produk Qubic yang dapat ditempel dimana saja dan dapat digunakan hanya dengan menempelkan smartphone."
  />
  <meta
    itemprop="image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/catalog/Qubic+Tap+Small.png"
  />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Qubic Tap" />
  <meta
    itemprop="description"
    content="Qubic tap adalah produk Qubic yang dapat ditempel dimana saja dan dapat digunakan hanya dengan menempelkan smartphone."
  />
  <meta
    itemprop="image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/catalog/Qubic+Tap+Small.png"
  />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic | Tap" />
  <meta
    property="og:description"
    content="Qubic tap adalah produk Qubic yang dapat ditempel dimana saja dan dapat digunakan hanya dengan menempelkan smartphone."
  />
  <meta
    property="og:image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/catalog/Qubic+Tap+Small.png"
  />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic | Tap" />
  <meta
    name="twitter:description"
    content="Qubic tap adalah produk Qubic yang dapat ditempel dimana saja dan dapat digunakan hanya dengan menempelkan smartphone."
  />
  <meta
    name="twitter:image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/catalog/Qubic+Tap+Small.png"
  />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="min-h-screen flex flex-col text-white gap-4 mb-20">
  <div class="flex justify-between items-center p-2 px-10 lg:px-20 mt-4 gap-4">
    <ol class="list-reset flex gap-2 text-lg">
      <li>Shop</li>
      <li>></li>
      <li>Qubic Tap</li>
    </ol>
    <button
      class="p-3 w-44 rounded-lg bg-blue-600"
      on:click={() => {
        addCartForXendit({
          name: product.name,
          quantity: 1,
          price: product.price,
          category: product.category,
          url: product.url,
        });
        addCart({
          type: cardType,
          id: cardId,
          product: product,
          qty: 1,
        });
        toastSuccess('Successfully added to cart');
      }}>Add to cart</button
    >
  </div>
  <div
    class="flex flex-col justify-center items-center gap-7 mb-10 px-10 lg:px-20"
  >
    <h1 class="font-bold text-3xl md:text-4xl">STICK - TAP - CONNECT</h1>
    <div
      class="flex justify-center items-center bg-yellow-400 w-full md:w-[700px] lg:w-[800px] h-[450px] md:h-[550px] rounded-lg"
    >
      <img
        src="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/qubic/qubic_tap.png"
        alt="qubic tap"
        class="w-64 md:w-96"
      />
    </div>
    <p class="font-bold text-3xl md:text-4xl mx-8 md:mx-[8%] lg:mx-[20%]">
      Gokil Banget! Qubic Tap bisa dipasang di hampir seluruh permukaan,
      khususnya pada bagian belakang HP dan mendapatkan seluruh fungsi yang
      sama!
    </p>
    <p class="font-bold text-3xl md:text-4xl mx-8 md:mx-[8%] lg:mx-[20%]">
      Ngga mentingin formalitas kartu, suka yang kecil, dan simple? Qubic Tap
      pilihan terbaik!
    </p>
  </div>
</div>
