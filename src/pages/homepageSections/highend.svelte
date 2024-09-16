<div class="flex min-h-screen w-full text-white justify-between items-center">
  <div class="flex flex-col mx-12 lg:mx-32">
    <h1 class="text-6xl mb-4 slide">High-end Laser</h1>

    <h1 class="font-light text-5xl mb-4 text-neutral-300">Non-toxic</h1>
    <h1 class="text-3xl lg:text-4xl text-neutral-500">
      Because Precision Matters
    </h1>
  </div>
  <video
    loading="lazy"
    title="Qubic card is made using high-precision laser."
    class="mx-10 rounded-xl w-[300px] 2xl:w-[850px] lg:w-[500px] md:block hidden"
    autoplay
    muted
    loop
  >
    <source
      src="https://qubicmedia.s3.ap-southeast-1.amazonaws.com/videos/laser.mov"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div>

<style>
  .slide {
    animation-name: slideFromLeft;
    animation-duration: 1.5s;
    transition: transform 0.5s ease;
  }

  @keyframes slideFromLeft {
    0% {
      transform: translateX(-400px);
    }
    100% {
      transform: translateX(0px);
    }
  }
</style>
