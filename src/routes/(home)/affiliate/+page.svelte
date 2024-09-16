<script>
  const toNewTab = () =>
    window.open('https://forms.gle/MGoSCqzzakf8rHNs6', '_blank').focus();
</script>

<svelte:head>
  <title>Affiliate</title>
  <link rel="canonical" href="https://qubic.id/affiliate" />
  <meta
    itemprop="description"
    content="Sukses bersama Qubic dengan meenjadi affiliator kartu qubic. Daftarkan dirimu sekarang untuk memulai kerja sama dengan Qubic."
  />
</svelte:head>

<div class="min-h-screen px-4 md:px-12 lg:px-20 text-white">
  <div
    class="flex flex-col lg:flex-row h-auto lg:h-screen lg:items-center justify-start lg:justify-between my-4"
  >
    <div class="flex flex-col lg:h-full lg:justify-around mb-8 lg:mb-0">
      <h1
        class="text-2xl md:text-3xl lg:text-5xl font-bold uppercase mb-8 lg:mb-0"
      >
        Sukses Bersama <br /> Dengan Qubic <br /> Affiliate Program
      </h1>
      <button
        class="p-4 w-full md:w-80 border-2 border-white hover:bg-neutral-800"
        on:click={toNewTab}>Pendaftaran</button
      >
    </div>
    <img
      src="https://images.unsplash.com/photo-1587614204968-68ba4b5e0be3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU0NjB8MHwxfHNlYXJjaHwzfHxhZmZpbGlhdGV8ZW58MHx8fHwxNjUyMjU5MDI0&ixlib=rb-1.2.1&q=80&w=1080"
      alt="affiliate-img"
      class="w-[600px] ml-0 lg:ml-6"
    />
  </div>

  <div
    class="flex flex-col-reverse lg:flex-row h-auto lg:h-screen lg:items-center justify-between my-4 mt-8 lg:mt-0"
  >
    <img
      src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU0NjB8MHwxfHNlYXJjaHwxM3x8YWZmaWxpYXRlfGVufDB8fHx8MTY1MjI1OTQyNQ&ixlib=rb-1.2.1&q=80&w=1080"
      alt="affiliate-img"
      class="w-[600px]"
    />
    <div
      class="flex flex-col h-full justify-center lg:ml-8 text-left lg:text-right mb-8 lg:mb-0"
    >
      <h1 class="text-2xl md:text-3xl lg:text-5xl font-bold mb-0 lg:mb-4">
        KAPANPUN & DIMANAPUN
      </h1>
      <h1 class="text-2xl md:text-3xl lg:text-5xl font-bold mb-0 lg:mb-4">
        Dapat Penghasilan
      </h1>
      <p class="text-md lg:text-xl">
        Dengan kode referral yang kalian bagikan, setiap pembelian menggunakan
        kode referral akan mendapatkan KOMISI menarik.
      </p>
    </div>
  </div>

  <div
    class="flex flex-col lg:flex-row h-auto lg:h-screen lg:items-center justify-between my-4  mt-8 lg:mt-0"
  >
    <div class="flex flex-col h-full justify-center mb-8 lg:mb-0">
      <h1 class="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">
        PROMO SPESIAL <br /> KHUSUS AFFILIATOR
      </h1>
      <p class="text-md lg:text-xl pr-0 lg:pr-20">
        Penawaran khusus akan selalu di-update secara berkala dengan penawaran
        yang diberikan khusus bagi Affiliator Qubic untuk mendapatkan BONUS
        serta promo khusus untuk menarik pembeli melakukan transaksi menggunakan
        kode referral.
      </p>
    </div>
    <img
      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU0NjB8MHwxfHNlYXJjaHw0MXx8YWZmaWxpYXRlfGVufDB8fHx8MTY1MjI1OTU2Mg&ixlib=rb-1.2.1&q=80&w=1080"
      alt="affiliate-img"
      class="w-[600px] ml-0 lg:ml-6"
    />
  </div>

  <div
    class="flex flex-col-reverse lg:flex-row h-auto lg:h-screen lg:items-center justify-between my-4 mb-8 mt-8 lg:mt-0"
  >
    <img
      src="https://images.unsplash.com/photo-1530099486328-e021101a494a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU0NjB8MHwxfHNlYXJjaHw0NXx8YWZmaWxpYXRlfGVufDB8fHx8MTY1MjI1OTU2Mg&ixlib=rb-1.2.1&q=80&w=1080"
      alt="affiliate-img"
      class="w-[600px]"
    />
    <div
      class="flex flex-col h-full justify-center lg:ml-8 text-left lg:text-right mb-8 lg:mb-0"
    >
      <h1 class="text-2xl md:text-3xl lg:text-5xl font-bold">5 Langkah</h1>
      <ol class="my-8 ml-0 lg:ml-6 text-md lg:text-xl">
        <li>Registrasi</li>
        <li>Proses Validasi</li>
        <li>Mendapat Referral Code</li>
        <li>Bagikan Code Anda</li>
        <li>Dapatkan Komisi</li>
      </ol>
      <h1 class="text-2xl md:text-3xl lg:text-5xl font-bold">
        BE A PART OF QUBIC FAMILY
      </h1>
    </div>
  </div>
</div>
