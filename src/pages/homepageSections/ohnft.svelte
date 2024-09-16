<script>
  import CardWrapper from '@comp/cards/cardWrapper.svelte';
  import { homepageImage } from '@lib/constants';
</script>

<div
  class="flex flex-col lg:flex-row justify-evenly lg:justify-center items-center w-full h-screen bg-white px-16"
>
  <div class="flex flex-col w-full justify-center items-center pr-16">
    <h1 class="font-bold text-6xl self-start mt-10">OH. NFT?</h1>
    <p class="self-start mt-1 font-bold">"Your future connections"</p>
    <p class="self-start mt-4 text-neutral-600">
      Dapat digunakan untuk akses komunitas Qubic dan mendapatkan <br /> keuntungan
      menarik
    </p>
    <p class="self-start font-bold text-3xl mt-20">Coming Soon</p>
  </div>
  <CardWrapper
    class="h-[350px] w-[500px] md:w-[700px] flex-col flex justify-center items-center"
  >
    <img
      loading="lazy"
      src={homepageImage.ohNFTSection}
      alt="ohnft"
      class="min-w-[600px] max-w-[700px] md:max-w-[900px]"
    />
  </CardWrapper>
</div>
