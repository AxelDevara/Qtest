<script>
  import { homepageImage } from '@lib/constants';
</script>

<div
  class="flex flex-col-reverse lg:flex-row justify-around items-center min-h-screen text-white"
>
  <img
    src={homepageImage.digitalized}
    alt="Share your profile only by tapping your card onto a phone."
    class="w-[350px] lg:w-[500px] z-20 my-8 lg:my-0 lg:translate-x-10"
  />

  <div class="flex flex-col self-start lg:self-center pl-6 lg:pl-0">
    <h1 class="text-4xl font-light mb-12 slide">
      Profil Digital <br /> Dinamis & Real-time
    </h1>

    <p class="text-2xl text-neutral-400">
      Akses dan sesuaikan data profil di mana pun <br /> dan kapan pun dengan
      jaringan internet <br /> secara real-time.
    </p>
  </div>
</div>

<style>
  .slide {
    animation-name: slideFromRight;
    animation-duration: 2s;
    transition: transform 0.8s ease;
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
