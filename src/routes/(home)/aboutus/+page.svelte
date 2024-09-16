<script>
  import { fly } from 'svelte/transition';
  import { homepageImage } from '@lib/constants';

  let y;
</script>

<svelte:head>
  <title>About Qubic</title>
  <link rel="canonical" href="https://qubic.id/aboutus" />
  <meta
    name="description"
    content="Sejak 2022, Qubic merevolusi cara masyarakat Indonesia menggunakan kartu nama. Produk Qubic telah dipakai oleh berbagai Indonesia, baik usaha kecil, startup, hingga perusahaan besar."
  />
  <meta name="robots" content="index, follow" />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="About Qubic" />
  <meta
    itemprop="description"
    content="Sejak 2022, Qubic merevolusi cara masyarakat Indonesia menggunakan kartu nama. Produk Qubic telah dipakai oleh berbagai Indonesia, baik usaha kecil, startup, hingga perusahaan besar."
  />
  <meta itemprop="image" content={homepageImage.whiteLogo} />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id/aboutus" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="About Qubic" />
  <meta
    property="og:description"
    content="Sejak 2022, Qubic merevolusi cara masyarakat Indonesia menggunakan kartu nama. Produk Qubic telah dipakai oleh berbagai Indonesia, baik usaha kecil, startup, hingga perusahaan besar."
  />
  <meta property="og:image" content={homepageImage.whiteLogo} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="About Qubic" />
  <meta
    name="twitter:description"
    content="Sejak 2022, Qubic merevolusi cara masyarakat Indonesia menggunakan kartu nama. Produk Qubic telah dipakai oleh berbagai Indonesia, baik usaha kecil, startup, hingga perusahaan besar."
  />
  <meta name="twitter:image" content={homepageImage.whiteLogo} />
</svelte:head>

<svelte:window bind:scrollY={y} />

<div class="flex flex-col min-h-screen bg-black text-white py-32">
  <div class="px-12 md:px-28 lg:px-40">
    <h1 class="text-xl mb-4 text-neutral-300">About</h1>
    <p class="text-4xl font-bold w-3/3 lg:w-2/3 mb-4 tracking-wider">
      Kami membuat produk eksklusif pengganti kartu nama konvensional yang
      dibuat khusus bagi setiap individu, startup, perusahaan kecil, menengah,
      maupun besar.
    </p>
  </div>
  <div
    class="lg:bg-fixed w-full h-screen bg-cover bg-center bg-no-repeat mt-16"
    style="background-image: url(https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)"
  />
  <div class="flex flex-col px-12 md:px-28 lg:px-40">
    <h1 class="text-xl mt-16 mb-4 text-neutral-300">Our Goal</h1>
    <p class="text-4xl font-bold w-3/3 lg:w-2/3 mt-4 tracking-wider">
      Simple. Kami ingin membuat setiap pribadi dapat melakukan koneksi dengan
      individu baru dengan cepat dan mudah, menggunakan produk yang berkelas dan
      dibuat khusus bagi setiap pengguna.
    </p>
    {#if y > 1000}
      <div class="flex justify-center py-20 w-full">
        <img
          class="w-[150px] md:w-[300px] lg:w-[400px] h-[300px] md:h-[500px] object-cover mt-16 mr-8"
          src="https://images.unsplash.com/flagged/photo-1574164908900-6275ca361157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          alt="We make the best business cards in Indonesia"
          transition:fly|local={{
            delay: 250,
            duration: 1000,
            y: 500,
          }}
        />
        <img
          class="w-[150px] md:w-[300px] lg:w-[400px] h-[300px] md:h-[500px] object-cover mt-16 translate-y-20"
          src="https://images.unsplash.com/photo-1540634759006-203f597e1a34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=791&q=80"
          alt="We have been established since 2022"
          transition:fly|local={{
            delay: 250,
            duration: 1000,
            y: 500,
          }}
        />
      </div>
    {/if}
    <p class="text-4xl w-3/3 lg:w-2/3 mt-20 tracking-wider font-bold">
      Pada era teknologi ini, beberapa telah mencoba untuk merubah cara
      melakukan koneksi antar individu yang menurut kami masih belum sempurna,
      dari sisi penggunaan yang susah, hingga tidak siapnya pengguna untuk
      menerima hal tersebut.
    </p>
    <p class="text-4xl w-3/3 lg:w-2/3 mt-4 tracking-wider font-bold">
      Permasalahan ini membuat kami hadir dengan produk Qubic untuk membuat
      pengguna dapat melakukan koneksi antar individu dengan mudah dan cepat
      menggunakan produk yang berkelas. Ketika bertemu orang baru, teman baru,
      maupun client baru, pengguna Qubic hanya perlu tempelkan produk ke HP
      dengan NFC untuk mengirim kontak, sosial media, serta website bisnis
      pengguna.
    </p>
  </div>
</div>
