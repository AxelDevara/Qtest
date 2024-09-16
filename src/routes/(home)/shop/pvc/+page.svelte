<script>
  import { homepageImage } from '@lib/constants';
  import catalog from '@lib/product/catalog.json';
  import OrderForm from '@pages/orderForm.svelte';
  import Price from '@comp/price.svelte';

  const scrollIntoView = ({ target }) => {
    const el = document.querySelector(target.getAttribute('href'));
    if (!el) return;
    el.scrollIntoView({
      behavior: 'smooth',
    });
  };

  let cardType = 'PVC';
  let cardId = 912321932935;

  let basePrice = parseInt(catalog[cardType][cardId]['price']) ?? 150000;
</script>

<svelte:head>
  <title>Qubic PVC Card</title>
  <meta
    name="description"
    content="Qubic PVC card adalah Qubic card dengan berat ringan dan bahan PVC untuk pemakai yang ingin tampil dengan desain custom."
  />
  <meta itemprop="image" content={homepageImage.withNameWhiteGlossy} />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Qubic PVC Card" />
  <meta
    itemprop="description"
    content="Qubic PVC card adalah Qubic card dengan berat ringan dan bahan PVC untuk pemakai yang ingin tampil dengan desain custom."
  />
  <meta itemprop="image" content={homepageImage.withNameWhiteGlossy} />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic | PVC Card" />
  <meta
    property="og:description"
    content="Qubic PVC card adalah Qubic card dengan berat ringan dan bahan PVC untuk pemakai yang ingin tampil dengan desain custom."
  />
  <meta property="og:image" content={homepageImage.withNameWhiteGlossy} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic | PVC Card" />
  <meta
    name="twitter:description"
    content="Qubic PVC card adalah Qubic card dengan berat ringan dan bahan PVC untuk pemakai yang ingin tampil dengan desain custom."
  />
  <meta name="twitter:image" content={homepageImage.withNameWhiteGlossy} />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="min-h-screen flex flex-col text-white gap-4">
  <div class="flex justify-between items-center p-2 px-10 lg:px-20 mt-4 gap-4">
    <ol class="list-reset flex gap-2 text-lg">
      <li>Shop</li>
      <li>></li>
      <li>PVC</li>
    </ol>
    <a
      href="#shop"
      class="flex justify-center p-3 w-44 rounded-lg bg-blue-600"
      on:click|preventDefault={scrollIntoView}>Add to cart</a
    >
  </div>
  <div class="flex flex-col justify-center items-center px-10 lg:px-20 gap-7">
    <div class="flex flex-col md:grid grid-cols-2 w-full">
      <div
        class="flex justify-center items-center p-4 bg-gradient-to-b from-red-500 to-black w-full md:w-[90%] h-[400px] md:h-[450px] rounded-xl"
      >
        <img
          src="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/merah_1.webp"
          alt="pvc"
          class="w-3/4 md:w-full lg:w-3/4"
        />
      </div>
      <div class="flex flex-col justify-evenly gap-4">
        <h1 class="text-3xl lg:text-4xl font-bold">
          Freedom in design colorful light
        </h1>
        <Price {basePrice} isHidePriceText />
        <p class="text-lg lg:text-2xl">
          Kartu nama dengan bahan yang mudah digunakan sehari-hari. Tampil
          berbeda dengan berbagai macam warna berbahan dasar putih matte yang
          ringan dan dibuat dengan kualitas tinggi untuk memberikan warna
          identitas anda.
        </p>
        <p class="text-lg lg:text-2xl">
          Pelanggan kami puas dengan kualitas dan simplisitas PVC card.
        </p>
      </div>
    </div>
  </div>
  <div class="flex flex-col md:grid grid-cols-3 gap-4 my-12 px-10 lg:px-20">
    <div
      class="flex justify-center items-center p-4 bg-gradient-to-b from-green-500 to-black w-full h-[250px] md:h-[300px] rounded-xl"
    >
      <img
        src="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/hijau4.webp"
        alt="pvc"
        class="w-[250px] md:w-3/4"
      />
    </div>
    <div
      class="flex justify-center items-center p-4 bg-gradient-to-b from-yellow-500 to-black w-full h-[250px] md:h-[300px] rounded-xl"
    >
      <img
        src="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/kuning2.webp"
        alt="pvc"
        class="w-[250px] md:w-3/4"
      />
    </div>
    <div
      class="flex justify-center items-center p-4 bg-gradient-to-b from-blue-500 to-black w-full h-[250px] md:h-[300px] rounded-xl"
    >
      <img
        src="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/biru_1.webp"
        alt="pvc"
        class="w-[250px] md:w-3/4"
      />
    </div>
  </div>

  <OrderForm
    {cardId}
    {cardType}
    cardImage={homepageImage.pvcWhiteCard}
    isTextGray800
  />
</div>
