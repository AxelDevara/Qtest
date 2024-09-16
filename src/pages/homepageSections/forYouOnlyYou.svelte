<script>
  import { goto } from '$app/navigation';
  import CardWrapper from '@comp/cards/cardWrapper.svelte';
  import { homepageImage } from '@lib/constants';

  const toOrderPage = () => goto('/shop');
</script>

<div
  class="flex flex-col lg:flex-row justify-evenly items-center w-full min-h-screen my-6 pl-12 md:pl-8 pr-16 md:pr-12"
>
  <div class="flex flex-col justify-center w-auto mr-0 md:mr-44 mb-20 lg:mb-0">
    <h1
      class="text-neutral-400 font-light text-5xl md:text-7xl mt-6 mb-3 slide"
    >
      For You. <br />
      <span class="text-white text-6xl md:text-8xl">Only You.</span>
    </h1>

    <p class="text-neutral-400 text-2xl max-w-lg">
      Design dibuat khusus satu persatu sesuai penulisan nama dan company
      masing-masing.
    </p>
  </div>
  <div class="flex flex-col justify-center items-center">
    <CardWrapper
      class="h-[350px] w-[350px] md:w-[600px] flex-col flex justify-center items-center"
    >
      <div
        id="main"
        class="grid grid-row-3 grid-cols-4 gap-1 w-[325px] md:w-[600px] h-96 -translate-x-3  md:translate-x-10 -translate-y-10"
      >
        <CardWrapper
          class="row-span-6 col-span-2 cursor-pointer bg-black bg-contain bg-no-repeat bg-center"
          style={`background-image: url('${homepageImage.withNameBlackGlossy}');`}
          on:click={toOrderPage}
        />
        <CardWrapper
          class="row-span-3 col-span-2 cursor-pointer bg-white bg-cover bg-no-repeat bg-center"
          style={`background-image: url("${homepageImage.ohNFTSection}")`}
          on:click={toOrderPage}
        />
        <CardWrapper
          class="row-span-3 col-span-2 cursor-pointer bg-white bg-cover bg-no-repeat bg-center"
          style={`background-image: url('${homepageImage.twoCard6}');`}
          on:click={toOrderPage}
        />
        <CardWrapper
          class="row-span-2 col-span-1 cursor-pointer bg-black bg-cover bg-no-repeat bg-center"
          style={`background-image: url('${homepageImage.withNameWhiteGlossy}');`}
          on:click={toOrderPage}
        />
        <CardWrapper
          class="row-span-2 col-span-1 cursor-pointer bg-black bg-cover bg-no-repeat bg-center"
          style={`background-image: url('${homepageImage.comingSoonWhite}');`}
          on:click={toOrderPage}
        />
        <CardWrapper
          class="row-span-2 col-span-1 cursor-pointer bg-black bg-cover bg-no-repeat bg-center"
          style={`background-image: url('${homepageImage.QRCodeGlossy}');`}
          on:click={toOrderPage}
        />
        <CardWrapper
          class="row-span-2 col-span-1 cursor-pointer bg-black bg-cover bg-no-repeat bg-center"
          style={`background-image: url('${homepageImage.withNameBlackMatte}');`}
          on:click={toOrderPage}
        />
      </div>
    </CardWrapper>
  </div>
</div>

<style>
  .slide {
    animation-name: slideFromLeft;
    animation-duration: 1.5s;
    transition: transform 0.5s ease;
  }

  @keyframes slideFromLeft {
    0% {
      transform: translateY(-300px);
    }
    100% {
      transform: translateY(0px);
    }
  }
</style>
