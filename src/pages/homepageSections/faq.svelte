<script>
  import AccordionItem from '@comp/accordionItem.svelte';
  import { slide } from 'svelte/transition';

  const faqlists = [
    {
      q: 'Apa itu Qubic Card / Qubic Tap?',
      a: [
        'Qubic Card / Qubic Tap merupakan pengganti kartu nama konvensional dengan teknologi NFC dan QR yang dapat memberikan data profil pemilik tanpa harus memberikan kartu nama kertas.',
      ],
    },
    {
      q: 'Apa bahan kartu yang digunakan?',
      a: [
        'Qubic Card berbahan metal / stainless steel',
        'Qubic Card berbahan PVC / plastik',
        'Qubic Tap berdiameter 3 cm epoxy',
      ],
    },
    {
      q: 'Apakah bisa custom dengan logo perusahaan?',
      a: [
        'Bisa. Qubic Card Metal / PVC dapat disesuaikan dengan logo perusahaan masing-masing. Untuk detailnya bisa langsung WhatsApp +628113087599',
      ],
    },
    {
      q: 'Apakah ada biaya bulanan?',
      a: [
        'Tidak untuk Qubic Basic. Membeli produk Qubic langsung mendapatkan Qubic Basic, Data dapat di edit kapanpun secara real-time termasuk dengan switch profile personal / business serta dapat menganalisa data.',
        'Jika dirasa butuh lebih lengkap, khususnya bagi corporate, bisa mencoba Qubic Teams dengan seluruh fitur yang lebih dibutuhkan bagi sebuah team yang bekerja dalam 1 divisi dengan adanya biaya bulanan.',
      ],
    },
    {
      q: 'Apakah membutuhkan jaringan internet?',
      a: [
        'Ya. Seluruh prosedur dari penggantian data ataupun membuka profil memerlukan jaringan internet.',
      ],
    },
    {
      q: 'Apakah perlu download aplikasi khusus?',
      a: [
        'Tidak. Qubic menyiapkan website yang sudah dibuat khusus untuk mempermudah pengguna membuka di HP ataupun desktop.',
      ],
    },
    {
      q: 'Apakah Qubic dapat digunakan di seluruh HP?',
      a: [
        'Qubic Card / Qubic Tap dapat digunakan di iPhone XR keatas / Android dengan beberapa seri tertentu yang telah memiliki NFC Reader. Jika HP anda dapat scan e-money, berarti HP anda memiliki NFC reader.',
        'Qubic menyediakan QR yang tercetak di setiap Qubic Card agar mempermudah orang untuk mengakses jika tidak memiliki NFC pada HP.',
      ],
    },
    {
      q: 'Dimana cara yang tepat untuk scan NFC Qubic Card?',
      a: [
        'iPhone terletak pada bagian atas belakang HP dekat dengan camera (iPhone XR keatas)',
        'Android terletak di tengah belakang HP',
      ],
    },
    {
      q: 'Dimana letak pemasangan terbaik Qubic Tap?',
      a: [
        'Agar tidak mengganggu kinerja NFC HP, letakkan pada bagian belakang bawah permukaan HP.',
      ],
    },
  ];
</script>

<div
  class="flex flex-col bg-[url(/polka.png)] pt-8 md:pt-0 justify-center items-center min-h-screen"
>
  <h1 class="text-white text-6xl font-light mb-8">FAQ</h1>
  <div class="flex flex-col w-full px-10 lg:px-48">
    <div class="text-white">
      {#each faqlists as faq}
        <AccordionItem title={faq.q} content={faq.a} />
      {/each}
      <details>
        <summary
          class="my-2 w-full p-4 cursor-pointer bg-neutral-800 border border-neutral-700"
        >
          Bagaimana cara membeli Qubic Card / Qubic Tap?
        </summary>
        <div
          class="w-full p-4 pl-6"
          transition:slide|local={{
            duration: 500,
          }}
        >
          <ul class="list-[square]">
            <li>
              Qubic tersedia di <a
                class="text-blue-400"
                href="https://tokopedia/com/qubicid">Tokopedia</a
              >
              ,
              <a class="text-blue-400" href="https://shopee.co.id/qubic.id"
                >Shopee</a
              >,
              <a class="text-blue-400" href="https://qubic.id/shop">Website</a>,
              & langsung via
              <a class="text-blue-400" href="https://wa.me/628113087599">
                WhatsApp</a
              >
            </li>
          </ul>
        </div>
      </details>
    </div>
    <div class="hidden flex-col w-full  text-neutral-500 py-6">
      <ol class="list-decimal">
        <li>Penggunaan laser hanya khusus untuk Qubic Card berbahan metal.</li>
        <li>
          Dapat mengecek privacy policy. Untuk keamanan data, team QUBIC akan
          terus berusaha memberikan security terbaik.
        </li>
        <li>
          Kartu NFC QUBIC dengan standard NXP dapat bertahan kurang lebih 7
          tahun dari pertama kali penggunaan.
        </li>
      </ol>
    </div>
  </div>
</div>
