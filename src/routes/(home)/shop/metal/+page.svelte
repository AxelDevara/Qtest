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

  let cardType = 'METAL';
  let cardId = 912321932931;

  let basePrice = parseInt(catalog[cardType][cardId]['price']) ?? 250000;
</script>

<svelte:head>
  <title>Qubic Metal Black Card</title>
  <meta
    name="description"
    content="Qubic metal black card adalah kartu Qubic berwarna hitam dengan matte finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta itemprop="image" content={homepageImage.QRCodeGlossy} />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Qubic Metal Black Card" />
  <meta
    itemprop="description"
    content="Qubic metal black card adalah kartu Qubic berwarna hitam dengan matte finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta itemprop="image" content={homepageImage.QRCodeGlossy} />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic | Metal Black Card" />
  <meta
    property="og:description"
    content="Qubic metal black card adalah kartu Qubic berwarna hitam dengan matte finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta property="og:image" content={homepageImage.QRCodeGlossy} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic | Metal Black Card" />
  <meta
    name="twitter:description"
    content="Qubic metal black card adalah kartu Qubic berwarna hitam dengan matte finishing yang dapat dibeli melalui official store maupun sosial media."
  />
  <meta name="twitter:image" content={homepageImage.QRCodeGlossy} />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="min-h-screen flex flex-col text-white gap-4">
  <div class="flex justify-between items-center p-2 px-5 md:px-20 mt-4 gap-4">
    <ol class="list-reset flex gap-2 text-lg">
      <li>Shop</li>
      <li>></li>
      <li>Metal Matte Black</li>
    </ol>
    <a
      href="#shop"
      class="flex justify-center p-3 w-44 rounded-lg bg-blue-600"
      on:click|preventDefault={scrollIntoView}>Add to cart</a
    >
  </div>
  <div class="px-5 md:px-20 mb-10">
    <div
      class="flex flex-col md:flex-row justify-center items-center bg-white w-full h-[450px] rounded-xl p-10 gap-4 bg-[url(/polka.png)]"
    >
      <img
        src={homepageImage.withNameBlackGlossy}
        alt=""
        class="w-[300px] md:w-1/2 lg:w-2/5"
      />
      <img
        src={homepageImage.QRCodeGlossy}
        alt=""
        class="w-[300px] md:w-1/2 lg:w-2/5"
      />
    </div>
  </div>
  <div
    class="flex flex-col md:grid grid-cols-2 border-t-2 border-neutral-700 h-[400px] py-4 px-5 md:px-20"
  >
    <div class="flex flex-col h-1/2 md:h-full justify-evenly pr-8">
      <h1 class="font-bold text-2xl md:text-4xl pt-5">Elegance in Motion</h1>
      <Price {basePrice} isHidePriceText />
      <p class="text-lg md:text-xl lg:text-2xl">
        Tampil berbeda dengan Qubic Card Metal yang bisa dipadukan dengan style
        fashion kalian saat bertemu orang untuk melakukan koneksi dengan client
        atau orang baru di sekitar kalian!
      </p>
    </div>
    <div
      class="flex items-center h-1/2 md:h-full md:border-l-2 border-neutral-700 md:pl-4 text-lg md:text-xl lg:text-2xl"
    >
      Dengan 2 pilihan warna matte terbaik yang bisa didapatkan, laser yang
      presisi hampir di semua design dan luxury yang didapatkan di sebuah kartu
      nama digital.
    </div>
  </div>

  <OrderForm
    {cardId}
    {cardType}
    cardImage={homepageImage.blackLogo}
    isTextGray400
  />
</div>
