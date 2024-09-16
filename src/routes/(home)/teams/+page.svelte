<script>
  import { homepageImage } from '@lib/constants';
  import Features from '@pages/features.svelte';

  let data = [
    {
      main: '10GB+/usaha',
      sub: 'Data tersimpan secara aman di Qubic network.',
    },
    {
      main: '100+ SMEs',
      sub: 'Tergabung sebagai pengguna pertama untuk produk Qubic.',
    },
    {
      main: 'Rp 500jt+',
      sub: 'Nilai infrastruktur yang didapat secara cuma-cuma untuk bisnis Indonesia.',
    },
    {
      main: 'FREE Trial',
      sub: 'Selama 1 bulan dengan minimal 5 pengguna dan dapat berhenti kapanpun.',
    },
  ];
</script>

<svelte:head>
  <title>Qubic Teams</title>
  <link rel="canonical" href="https://qubic.id/teams" />
  <meta
    name="description"
    content="Manfaatkan Qubic Teams untuk berkolaborasi networking dalam perusahaan. Dapatkan database tersentralisir dan analisa otomatis buatan Qubic."
  />
  <meta itemprop="image" content={homepageImage.QRCodeGlossy} />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Qubic Teams" />
  <meta
    itemprop="description"
    content="Manfaatkan Qubic Teams untuk berkolaborasi networking dalam perusahaan. Dapatkan database tersentralisir dan analisa otomatis buatan Qubic."
  />
  <meta itemprop="image" content={homepageImage.QRCodeGlossy} />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic Teams" />
  <meta
    property="og:description"
    content="Manfaatkan Qubic Teams untuk berkolaborasi networking dalam perusahaan. Dapatkan database tersentralisir dan analisa otomatis buatan Qubic."
  />
  <meta property="og:image" content={homepageImage.QRCodeGlossy} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic Teams" />
  <meta
    name="twitter:description"
    content="Manfaatkan Qubic Teams untuk berkolaborasi networking dalam perusahaan. Dapatkan database tersentralisir dan analisa otomatis buatan Qubic."
  />
  <meta name="twitter:image" content={homepageImage.QRCodeGlossy} />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div
  class="min-h-screen text-white flex flex-col items-center gap-4 py-8 px-4 lg:px-10"
>
  <h1 class="text-4xl md:text-5xl font-light text-center">
    Empowering Indonesian SME & Startups
  </h1>
  <h1 class="text-4xl md:text-5xl font-medium text-center">Qubic Teams</h1>
  <p class="text-neutral-400 max-w-4xl text-center px-4">
    Kolaborasi dalam sebuah tim untuk mengembangkan bisnis anda. Kumpulkan
    kontak dan analisis menggunakan database sentral yang dapat membantu anda
    mengembangkan tim dalam berkoneksi dengan client baru seperti agen properti,
    tim asuransi, tim sales, restaurant, dan banyak lagi.
  </p>
  <img
    width="750px"
    class="rounded-md mb-4"
    src="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/qubic/mockup.jpg"
    alt="Teams Dashboard"
  />
  {#each data as item}
    <div
      class=" h-32 bg-gradient-to-tr max-w-xl from-blue-600 to-red-600 w-full md:w-4/5 lg:w-3/4 rounded-lg p-1 gap-1"
    >
      <div
        class="flex flex-col justify-center items-center rounded-lg bg-neutral-800 p-3 h-full"
      >
        <h1 class="font-light text-3xl">{item.main}</h1>
        <p class="text-lg text-neutral-400 text-center">
          {item.sub}
        </p>
      </div>
    </div>
  {/each}
  <Features />
  <button
    on:click={() => window.open('https://wa.me/628113087599', '_blank').focus()}
    class="bg-blue-600 mx-auto font-light text-2xl px-6 py-3 rounded-lg"
    >Get Free 3 Month Trial</button
  >
</div>
