<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Scrambler from '@lib/textScramble';

  let html;
  const phrases = [
    'Change the card',
    'Change the game',
    'Sleek Metal Design',
    'Integrated NFC & QR',
  ];
  const scrambler = new Scrambler();
  let text = phrases[0];
  const handleScramble = (e) => {
    text = e;
  };

  let context;
  let canvas;
  let container;
  let images = [];

  const toShop = () => goto('/shop/');

  const currentFrame = (index) =>
    `/scroll_card/${index.toString().padStart(4, '0')}.jpg`;

  const updateImage = (index) => {
    if (index < 46) {
      if (images[index]) {
        const hRatio = canvas?.width / images[index]?.width,
          vRatio = canvas?.height / images[index]?.height,
          ratio = Math.min(hRatio, vRatio),
          x = (canvas?.width - images[index]?.width * ratio) / 2, // this = image loaded
          y = (canvas?.height - images[index]?.height * ratio) / 2;
        context.drawImage(
          images[index],
          0,
          0,
          images[index]?.width,
          images[index]?.height,
          x,
          y,
          images[index]?.width * ratio,
          images[index]?.height * ratio
        );
      }
    }
  };

  const frameCount = 45;

  const preloadImages = () => {
    for (let i = 0; i < frameCount; i++) {
      images[i] = document.createElement('img');
      images[i].src = currentFrame(i);
    }
  };

  onMount(() => {
    html = document.documentElement;
    canvas = document.getElementById('hero');
    container = document.getElementById('heroContainer');
    preloadImages();
    // @ts-ignore
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 64;

    const img = new Image();
    img.src = currentFrame(0); // we'll make this dynamic in the next step, for now we'll just load image 1 of our sequence
    img.onload = function () {
      updateImage(0);
    };

    window.addEventListener('scroll', () => {
      const scrollTop = html.scrollTop;
      const maxScrollTop = container.scrollHeight - window.innerHeight;

      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );
      if (frameIndex == 5) {
        if (text != phrases[0])
          scrambler.scramble(phrases[0], handleScramble, {
            characters: Array.from(phrases[1].trim()),
          });
      }
      if (frameIndex == 15) {
        if (text != phrases[1])
          scrambler.scramble(phrases[1], handleScramble, {
            characters: Array.from(phrases[2].trim()),
          });
      }
      if (frameIndex == 25) {
        if (text != phrases[2])
          scrambler.scramble(phrases[2], handleScramble, {
            characters: Array.from(phrases[3].trim()),
          });
      }
      if (frameIndex == 32) {
        if (text != phrases[3])
          scrambler.scramble(phrases[3], handleScramble, {
            characters: Array.from(phrases[0].trim()),
          });
      }
      requestAnimationFrame(() => updateImage(frameIndex + 1));
    });
  });
</script>

<svelte:head>
  <title>Qubic - Digital Business Card</title>
  <meta
    name="description"
    content="Qubic adalah pelopor kartu nama digital di Indonesia. Pelajari lebih lanjut keunggulan menggunakan Qubic card untuk berbisnis di era modern ini."
  />
  <meta
    itemprop="image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/office_3.webp"
  />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Qubic - Digital Business Card" />
  <meta
    itemprop="description"
    content="Qubic adalah pelopor kartu nama digital di Indonesia. Pelajari lebih lanjut keunggulan menggunakan Qubic card untuk berbisnis di era modern ini."
  />
  <meta
    itemprop="image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/office_3.webp"
  />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic - Digital Business Card" />
  <meta
    property="og:description"
    content="Qubic adalah pelopor kartu nama digital di Indonesia. Pelajari lebih lanjut keunggulan menggunakan Qubic card untuk berbisnis di era modern ini."
  />
  <meta
    property="og:image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/office_3.webp"
  />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic - Digital Business Card" />
  <meta
    name="twitter:description"
    content="Qubic adalah pelopor kartu nama digital di Indonesia. Pelajari lebih lanjut keunggulan menggunakan Qubic card untuk berbisnis di era modern ini."
  />
  <meta
    name="twitter:image"
    content="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/cards/office_3.webp"
  />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="min-h-screen flex flex-col text-white gap-4 overflow-clip">
  <!-- <div class="parallax w-full md:w-[65%] max-w-4xl mx-auto" /> -->
  <div data-nosnippet id="heroContainer" class="h-[440vh] overflow-clip">
    <canvas class="sticky top-[64px] z-10" id="hero" />
    <div class="w-full sticky top-[94px] z-20 flex-col flex mt-14 items-center">
      <p id="text1" class="text-6xl font-light text-center uppercase">{text}</p>
    </div>
  </div>

  <div
    class="flex bg-[url(/polka.png)] flex-col  items-center text-center  md:px-20 md:pb-4 pb-2 px-4 bg-black p-4"
  >
    <h1 class="text-md md:text-lg text-neutral-500">
      Kartu nama yang pintar dan stylish
    </h1>
    <p class="text-2xl md:text-3xl text-white font-light">
      Level-up perkenalanmu dengan kartu nama futuristik
    </p>
    <p class="text-md md:text-lg  text-neutral-500">
      Tersedia untuk seluruh Indonesia
    </p>
    <button
      on:click={toShop}
      class="flex mb-4 justify-center items-center outline outline-white px-3 w-52 h-16 mt-4 text-xl rounded-lg"
    >
      Beli sekarang
    </button>
  </div>
  <div
    class="justify-around items-center bg-[url('/polka.png')] font-bold text-xl py-10 w-full mt-[10px] h-[40px] flex-row hidden md:flex"
  >
    <p>100+ Businesses</p>
    <p>300+ Individuals</p>
    <p>10+ Institutions</p>
    <p>Trust Qubic</p>
  </div>
  <h3 class="text-xl font-bold mx-auto md:hidden block mt-10">Trusted by</h3>
  <div
    class="sm:px-0 px-3 flex-col mx-auto grid grid-cols-2 md:grid-cols-3 gap-2 items-center justify-center mt-3 mb-8 w-full md:w-3/4 lg:w-[60%]"
  >
    <img
      src="/logos/tokocrypto.png"
      class="mx-auto"
      width="86"
      height="86"
      alt=""
    />
    <img
      src="/logos/epson.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
    <img
      src="/logos/remax.png"
      class="mx-auto"
      width="128"
      height="128"
      alt="remax"
    />
    <img
      src="/logos/sequis.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
    <img
      src="/logos/tanobel.png"
      class="mx-auto"
      width="128"
      height="128"
      alt="tanobel"
    />
    <img
      src="/logos/pertamina.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
    <img
      src="/logos/gushcloud.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
    <img
      src="/logos/accor.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
    <img
      src="/logos/tvone.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
    <img
      src="/logos/sig.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
    <img
      src="/logos/cladtek.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
    <img
      src="/logos/cakap.png"
      class="mx-auto"
      width="128"
      height="128"
      alt=""
    />
  </div>
  <h3 class="mx-auto text-xl font-bold">And Many Others ...</h3>
  <div
    class="flex sm:px-0 px-3 flex-col mx-auto md:grid grid-cols-2 grid-rows-2 text-center md:text-left mt-10 mb-8 w-full md:w-3/4 lg:w-[60%]"
  >
    <div class="bg-gradient-to-tr rounded-md from-blue-600 to-red-600 ">
      <div class="flex flex-col p-4 gap-2 md:gap-1 min-h-52">
        <h3 class="text-xl text-left md:text-lg lg:text-xl font-bold">
          80% Lebih Cepat Bertukar Kontak
        </h3>
        <p class="text-lg text-left md:text-md lg:text-lg text-neutral-200">
          Mudah dan cepat dengan tap NFC / scan QR pada produk Qubic, bertukar
          data, dan dapat langsung masuk ke kontak HP.
        </p>
      </div>
    </div>
    <div
      class="p-4 gap-2 md:gap-1 min-h-52 border-neutral-500 flex flex-col md:items-start md:pr-10"
    >
      <h3
        class="text-xl text-left md:text-lg lg:text-xl font-bold md:pr-16 lg:pr-10"
      >
        9/10 Memilih NFC Card
      </h3>
      <p class="text-lg text-left md:text-md lg:text-lg text-neutral-400">
        Teknologi NFC banyak disukai karena cepat dan mudah digunakan, seperti
        pada sistem pembayaran serta penggunaan kartu E-Toll.
      </p>
    </div>
    <div
      class="p-4 gap-2 text-left md:gap-1 min-h-52 flex flex-col justify-end"
    >
      <h3 class="text-xl md:text-lg lg:text-xl font-bold">
        100% Lebih Lengkap
      </h3>
      <p class="text-lg text-left md:text-md lg:text-lg text-neutral-400">
        Digital Business Card memberikan data lebih lengkap dan mudah diubah
        dibandingkan kartu nama konvensional.
      </p>
    </div>
    <div
      class="p-4 bg-gradient-to-tr from-blue-600 to-red-600 gap-2 md:gap-1 min-h-52 text-center md:text-left rounded-md border-neutral-500 flex flex-col md:items-start"
    >
      <h3
        class="text-xl md:text-lg text-left lg:text-xl font-bold items-end md:pr-16 lg:pr-10"
      >
        10/10 Feedback kami terima
      </h3>
      <p class="text-lg text-left md:text-md lg:text-lg text-neutral-200">
        Team Qubic meluncurkan update secara berkala dengan fitur baru serta
        penyempurnaan dari feedback anda untuk memberikan pengalaman terbaik.
      </p>
    </div>
  </div>

  <div
    class="flex flex-col justify-center items-center text-center my-6 w-full  gap-4 px-4"
  >
    <div class="px-2 md:px-4 py-1 bg-blue-600">New Product</div>
    <h2 class="text-2xl md:text-4xl font-light">
      Empowering Indonesian SMEs & <br class="hidden md:block" /> Startups with
      <span
        class="text-blue-600 underline cursor-pointer"
        on:click={() => goto('/teams')}
      >
        Qubic Teams</span
      >
    </h2>

    <h2
      class="text-sm sm:text-md md:text-xl outline outline-neutral-100 rounded-md p-2 md:p-4 cursor-pointer"
      on:click={() => goto('/teams')}
    >
      Join Now →
    </h2>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-2 text-center w-full">
    <div
      class="flex border-t border-r border-neutral-600 p-10 flex-col justify-start items-start"
    >
      <h1 class="text-2xl text-left md:text-4xl font-light">
        Accepting Custom Designs
      </h1>
      <p class="text-neutral-400 text-left">
        Minimum order 3 units. Terms & Condition apply
      </p>
      <a
        href="/pages/contactus"
        class="text-md mt-4 md:text-xl border border-neutral-100 rounded-md px-4 py-1"
        >Get quote →</a
      >
    </div>
    <div
      class="flex border-t border-neutral-600 p-10 flex-col justify-start items-start"
    >
      <h1 class="text-2xl text-left md:text-4xl font-light">
        Accepting Partnerships & Collaborations
      </h1>
      <p class="text-neutral-400 text-left">
        We are open to work together on unique ideas.
      </p>
      <a
        href="/pages/contactus"
        class="text-md mt-4 md:text-xl border border-neutral-100 rounded-md px-4 py-1"
        >Contact us →</a
      >
    </div>
  </div>
</div>
