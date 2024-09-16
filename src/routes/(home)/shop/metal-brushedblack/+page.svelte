<script>
  import Price from '@comp/price.svelte';
  import { homepageImage } from '@lib/constants';
  import catalog from '@lib/product/catalog.json';
  import OrderForm from '@pages/orderForm.svelte';

  const scrollIntoView = ({ target }) => {
    const el = document.querySelector(target.getAttribute('href'));
    if (!el) return;
    el.scrollIntoView({
      behavior: 'smooth',
    });
  };

  let cardType = 'METAL';
  let cardId = 912361932992;

  let basePrice = parseInt(catalog[cardType][cardId]['price']) ?? 250000;
</script>

<svelte:head>
  <title>Qubic Brushed Black Card</title>
  <meta
    name="description"
    content="Qubic black card adalah kartu Qubic berwarna hitam dengan brush finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta itemprop="image" content={homepageImage.brushedblack2} />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Qubic Brushed Black Card" />
  <meta
    itemprop="description"
    content="Qubic black card adalah kartu Qubic berwarna hitam dengan brush finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta itemprop="image" content={homepageImage.brushedblack2} />

  <!-- Facebook Metatag -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic Brushed Black Card" />
  <meta
    property="og:description"
    content="Qubic black card adalah kartu Qubic berwarna hitam dengan brush finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta property="og:image" content={homepageImage.brushedblack2} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic Brushed Black Card" />
  <meta
    name="twitter:description"
    content="Qubic black card adalah kartu Qubic berwarna hitam dengan brush finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta name="twitter:image" content={homepageImage.brushedblack2} />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="min-h-screen flex flex-col text-white gap-4">
  <div class="flex justify-between items-center p-2 px-5 md:px-20 mt-4 gap-4">
    <ol class="list-reset flex gap-2 text-lg">
      <li>Shop</li>
      <li>></li>
      <li>Metal Brushed Black</li>
    </ol>
    <a
      href="#shop"
      class="flex justify-center p-3 w-44 rounded-lg bg-blue-600"
      on:click|preventDefault={scrollIntoView}>Add to cart</a
    >
  </div>
  <div class="px-5 md:px-20 mb-10 gap-4 flex flex-col">
    <h1 class="text-white font-bold text-4xl">Special Edition: Black</h1>
    <div class="flex w-full h-96 gap-4">
      <img
        src={homepageImage.brushedblack5}
        class="bg-red-900 w-1/2 h-full rounded-lg object-cover"
        alt="Qubic Card Metal Brushed Red"
      />
      <img
        src={homepageImage.brushedblack3}
        class="bg-red-900 w-1/2 h-full rounded-lg object-cover"
        alt="Qubic Card Metal Brushed Red"
      />
    </div>
    <div class="flex w-full h-96 gap-4">
      <h1 class="w-1/2 text-2xl md:text-4xl lg:text-5xl mt-16 font-bold">
        Our best-seller product becomes more luxurious with a brushed finish and
        glossy look on the metal material. It looks gorgeous!
      </h1>
      <img
        src={homepageImage.brushedblack4}
        class="bg-red-900 w-1/2 h-full rounded-lg object-cover"
        alt="Qubic Card Metal Brushed Red"
      />
    </div>
  </div>

  <OrderForm
    {cardId}
    {cardType}
    cardImage={homepageImage.brushedblack2}
    isTextGray400
  />
</div>
