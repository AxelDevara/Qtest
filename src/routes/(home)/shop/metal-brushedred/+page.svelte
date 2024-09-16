<script>
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
  let cardId = 912321932933;

  let basePrice = parseInt(catalog[cardType][cardId]['price']) ?? 250000;
</script>

<svelte:head>
  <title>Qubic Brushed Red Card</title>
  <meta
    name="description"
    content="Qubic red card adalah kartu Qubic berwarna merah dengan brush finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta itemprop="image" content={homepageImage.metalRedCard} />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Qubic Brushed Red Card" />
  <meta
    itemprop="description"
    content="Qubic red card adalah kartu Qubic berwarna merah dengan brush finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta itemprop="image" content={homepageImage.metalRedCard} />

  <!-- Facebook Metatag -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic Brushed Red Card" />
  <meta
    property="og:description"
    content="Qubic red card adalah kartu Qubic berwarna merah dengan brush finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta property="og:image" content={homepageImage.metalRedCard} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic Brushed Red Card" />
  <meta
    name="twitter:description"
    content="Qubic red card adalah kartu Qubic berwarna merah dengan brush finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta name="twitter:image" content={homepageImage.metalRedCard} />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="min-h-screen flex flex-col text-white gap-4">
  <div class="flex justify-between items-center p-2 px-5 md:px-20 mt-4 gap-4">
    <ol class="list-reset flex gap-2 text-lg">
      <li>Shop</li>
      <li>></li>
      <li>Metal Brushed Red</li>
    </ol>
    <a
      href="#shop"
      class="flex justify-center p-3 w-44 rounded-lg bg-blue-600"
      on:click|preventDefault={scrollIntoView}>Add to cart</a
    >
  </div>
  <div class="px-5 md:px-20 mb-10 gap-4 flex flex-col">
    <h1 class="text-white font-bold text-4xl">Special Edition: Red</h1>
    <div class="flex w-full h-96 gap-4">
      <div class="flex flex-col w-1/2 gap-4">
        <img
          src={homepageImage.metalRedPic1}
          class="bg-red-900 w-full h-1/2 rounded-lg object-cover"
          alt="Qubic Card Metal Brushed Red"
        />
        <img
          src={homepageImage.metalRedPic2}
          class="bg-red-900 w-full h-1/2 rounded-lg object-cover"
          alt="Qubic Card Metal Brushed Red"
        />
      </div>
      <img
        src={homepageImage.metalRedPic3}
        class="bg-red-900 w-1/2 h-full rounded-lg object-cover"
        alt="Qubic Card Metal Brushed Red"
      />
    </div>
    <div class="flex w-full h-96 gap-4">
      <h1 class="w-1/2 text-2xl md:text-4xl lg:text-5xl mt-16 font-bold">
        Inspired by Ferrari's classic red, We are bringing the luxury color to
        match with your luxury car.
      </h1>
      <img
        src={homepageImage.metalRedPic4}
        class="bg-red-900 w-1/2 h-full rounded-lg object-cover"
        alt="Qubic Card Metal Brushed Red"
      />
    </div>
  </div>

  <OrderForm
    {cardId}
    {cardType}
    cardImage={homepageImage.metalRedCard}
    isTextGray400
  />
</div>
