<script>
  import { fly } from 'svelte/transition';
  import CardWrapper from '@comp/cards/cardWrapper.svelte';
  import { homepageImage } from '@lib/constants';
  // res: 720x540
  export let y;
</script>

<div
  class="flex flex-col bg-opacity-10 bg-[url(/polka.png)] justify-center items-center w-full min-h-screen"
>
  <h1 class="text-white text-8xl font-light pt-10 slide pl-12 lg:pl-0">
    Seperti Apa Gaya-Mu?
  </h1>

  <div class="flex flex-col w-full justify-center items-center my-24 md:mb-0">
    <CardWrapper
      class="h-[350px] w-[550px] lg:w-2/5 flex-col flex justify-center items-center"
    >
      {#if y > 740}
        <img
          loading="lazy"
          src={homepageImage.comingSoonWhite}
          alt="We changed how business card look in Indonesia"
          class="min-w-[300px] max-w-[400px] lg:min-w-[300px] lg:max-w-[500px] ml-24 translate-y-52 translate-x-6 md:translate-x-32"
          transition:fly|local={{ x: 100, duration: 1000 }}
        />
        <img
          loading="lazy"
          src={homepageImage.withNameBlackMatte}
          alt="Black matte card is Indonesian's favorite Qubic card model."
          class="min-w-[300px] max-w-[400px] lg:min-w-[300px] lg:max-w-[500px] ml-24 -translate-y-52 -translate-x-32 md:-translate-x-56"
          transition:fly|local={{ x: -100, duration: 1000 }}
        />
      {/if}
    </CardWrapper>

    <h1
      class="font-light text-6xl mt-16 lg:mt-20 sm:px-12 lg:px-0 text-white slide-metal self-start lg:self-center px-12"
    >
      Metal
    </h1>

    <p
      class="mt-1 sm:px-12 lg:px-0 text-neutral-300 self-start lg:self-center px-12"
    >
      Crafted for Changemarkers
    </p>
    <p
      class="mt-4 text-left lg:text-center sm:px-12 lg:px-0 text-neutral-400 text-xl self-start lg:self-center px-12"
    >
      Berbahan stainless steel, Qubic card dibuat dengan standard tinggi, <br />
      diselimuti sentuhan ekslusif matte yang khusus dibuat hanya untuk kalian.
    </p>
  </div>

  <div
    class="grid grid-rows-2 grid-flow-col w-full justify-center items-center my-20"
  >
    {#if y > 1680}
      <img
        loading="lazy"
        src={homepageImage.mockupWhite1}
        alt="We re-imagine how business card look like and add technology to ease social connections."
        transition:fly|local={{
          delay: 1000,
          duration: 1000,
          y: 500,
        }}
        class="w-auto h-auto p-2 my-24"
      />
      <img
        loading="lazy"
        src={homepageImage.mockupBlack2}
        alt="Replace printed cards with Qubic card."
        class="w-[32rem] h-auto p-2 "
        transition:fly|local={{
          delay: 1000,
          duration: 1000,
          y: 500,
        }}
      />
      <img
        loading="lazy"
        src={homepageImage.mockupBlack1}
        alt="Qubic black card is very popular among SMEs and designers"
        transition:fly|local={{
          delay: 1000,
          duration: 1000,
          y: 500,
        }}
        class="w-[36rem] h-auto p-2 translate-y-24 aspect-square object-cover"
      />
      <img
        loading="lazy"
        src={homepageImage.mockupWhite2}
        alt="Qubic white card is better than your printed cards"
        transition:fly|local={{
          delay: 1000,
          duration: 1000,
          y: 500,
        }}
        class="h-auto p-2 translate-y-24 aspect-square object-cover w-[40rem]"
      />
    {/if}
  </div>

  <div class="flex flex-col w-full ">
    <div
      class="flex flex-col py-[100px] lg:flex-row-reverse w-full justify-between items-center mt-12 lg:my-24 md:mb-0 px-12"
    >
      <CardWrapper
        class="h-[200px] w-full lg:w-2/5 flex-col flex justify-center items-center lg:mr-32"
      >
        {#if y > 2800}
          <img
            loading="lazy"
            width="400px"
            height="300px"
            src={homepageImage.QRCodeGlossy}
            alt="You can scan the QR Code on Qubic's back to get the business profile"
            class="min-w-[300px] max-w-[400px] lg:min-w-[150px] lg:max-w-[300px] ml-24 translate-y-52 lg:translate-y-32 -translate-x-52 lg:-translate-x-20"
            transition:fly|local={{ x: -100, duration: 1000 }}
          />
          <img
            loading="lazy"
            width="400px"
            height="300px"
            src={homepageImage.withCompanyLogoWhiteMatte}
            alt="Here is why Indonesians love Qubic business cards"
            class="min-w-[300px] max-w-[400px] lg:min-w-[150px] lg:max-w-[300px] ml-24 -translate-y-52 lg:-translate-y-32 translate-x-28 lg:translate-x-10"
            transition:fly|local={{ x: 100, duration: 1000 }}
          />
        {/if}
      </CardWrapper>
      <div class="flex flex-col justify-center max-w-lg mx-auto">
        <h1
          class="text-6xl font-light text-white  mt-32 text-center lg:mt-10 self-start slide-pvc"
        >
          PVC
        </h1>

        <p class="mt-2 text-neutral-300 font-medium text-center self-start">
          Lightness and Elegance Maximized
        </p>
        <p class="mt-2 text-left max-w-lg text-neutral-400 text-xl">
          Bahan umum yang sering digunakan pada kartu, tidak akan bisa <br />
          mendapat rasa yang sama seperti Qubic Card. Diselimuti sentuhan <br />
          matte, PVC card tidak pernah terasa se-exclusive ini.
        </p>
      </div>
    </div>

    <div
      class="flex flex-col lg:flex-row w-full justify-between items-center mt-12 lg:my-24 md:mb-0 px-12"
    >
      {#if y > 3500}
        <img
          loading="lazy"
          src={homepageImage.tap}
          alt="Your printed business cards can't do what Qubic cards can."
          width="600px"
          height="600px"
          class="mx-auto border-l border-t border-neutral-600 w-full lg:w-2/5 lg:mr-32"
          transition:fly|local={{ x: -100, duration: 2000 }}
        />
      {/if}
      <div class="mt-10 mx-auto self-start slide-pvc">
        <h1
          class="text-6xl text-white font-light mt-0 text-left lg:mt-10 self-start slide-tap"
        >
          Qubic Tap
        </h1>

        <p class="mt-2 text-neutral-300 text-lg text-left self-start">
          Small but Everywhere
        </p>
        <p class="mt-2 lg:mx-0 lg:text-left text-neutral-400 text-xl max-w-lg">
          Qubic menyediakan salah satu alternatif bagi anda yang tidak suka
          menggunakan kartu, tetapi tetap ingin melakukan koneksi dengan
          berbagai orang. Qubic Tap dibuat dengan bahan epoxy yang tahan air dan
          dapat dilekatkan dipermukaan HP, case, ataupun dompet kalian tanpa
          meninggalkan bekas ketika dilepas.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .slide {
    animation-name: slideFromTop;
    animation-duration: 2s;
    transition: transform 0.8s ease;
  }

  .slide-metal {
    animation-name: slideFromBottom;
    animation-duration: 2s;
    transition: transform 0.8s ease;
  }

  .slide-pvc {
    animation-name: slideFromLeft;
    animation-duration: 1.5s;
    transition: transform 0.5s ease;
  }

  .slide-tap {
    animation-name: slideFromRight;
    animation-duration: 1.5s;
    transition: transform 0.5s ease;
  }

  @keyframes slideFromTop {
    0% {
      transform: translateY(-400px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes slideFromBottom {
    0% {
      transform: translateY(100px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes slideFromLeft {
    0% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  @keyframes slideFromRight {
    0% {
      transform: translateX(300px);
    }
    100% {
      transform: translateX(0px);
    }
  }
</style>
