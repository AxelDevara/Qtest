<script>
  export let data;
  export let section;
</script>

<div
  class="h-[380px] rounded-md bg-center bg-cover"
  style={`background-image: url(${data.image});`}
/>

<div
  class="flex flex-col justify-evenly rounded-md transition-opacity duration-300 hover:bg-neutral-800/70 w-full h-full p-4 md:p-8 text-lg"
>
  <h1 class="font-light mb-2 md:mb-4 text-4xl">
    {data.name}
  </h1>
  <p class=" text-neutral-500">
    {section === 'METAL'
      ? 'Berbahan stainless steel, Qubic Card dibuat dengan standard yang tinggi, diselimuti sentuhan eksklusif “matte” yang khusus dibuat hanya untuk anda.'
      : section === 'PVC'
      ? 'Bahan umum yang sering digunakan pada kartu, tidak akan bisa mendapat rasa yang sama seperti Qubic Card. Diselimuti sentuhan "matte" yang elegan, PVC card tidak pernah terasa se-exclusive ini.'
      : section === 'METAL-RED'
      ? 'Limited Edition, Stainless Steel Qubic Card hadir khusus dengan warna "brushed red" memberikan kesan eksklusif dan elegan pada sebuah kartu nama anda.'
      : section === 'METAL-BLACK'
      ? 'Limited Edition, Stainless Steel Qubic Card hadir khusus dengan warna "brushed black" memberikan kesan eksklusif dan elegan pada sebuah kartu nama anda.'
      : 'Berbahan epoxy dengan diameter 3cm, Qubic Tap sangat cocok bagi anda yang suka praktis tanpa kartu. Lekatkan Qubic Tap pada bagian belakang handphone ataupun permukaan lain seperti dompet dengan fitur dan fungsi yang sama dengan Qubic Card.'}
  </p>
  <div class="grid grid-cols-1 mt-4 md:grid-cols-2 items-center justify-center">
    <p class="text-lg my-3 md:my-0 font-bold">
      {new Intl.NumberFormat('id', {
        currency: 'IDR',
        style: 'currency',
      }).format(data.price)}
    </p>
    <button
      on:click
      class="self-end hover:border text-base md:w-auto w-full bg-blue-600 rounded-sm px-4 py-2"
      >{section == 'tap' ? 'Get yours now' : 'Design your card'}</button
    >
  </div>
</div>
