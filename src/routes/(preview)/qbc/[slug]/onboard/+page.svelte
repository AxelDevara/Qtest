<script>
  import { goto } from '$app/navigation';
  import { officialLinks } from '@lib/constants';
</script>

<div
  class="bg-black bg-[url(/polka.png)] flex mx-auto justify-center items-center min-h-screen"
>
  <div class="text-white max-w-lg mx-auto px-4">
    <p class="text-3xl font-bold">
      Your card has been <span class="text-green-300">activated</span>!
    </p>

    <p class="text-neutral-400">
      Welcome to your new card! Let's do something cool with it.
    </p>

    <p
      class="bg-neutral-800 p-3 ml-6 mt-2 cursor-pointer"
      on:click={async () => await goto('/user')}
    >
      I want to edit my profile
    </p>
    <p
      class="bg-neutral-800 p-3 ml-6 mt-1 cursor-pointer"
      on:click={async () => await goto(officialLinks.youtubeChannel)}
    >
      I'd like to watch some tutorials
    </p>
    <p
      class="bg-neutral-800 p-3 ml-6 mt-1 cursor-pointer"
      on:click={() => history.back()}
    >
      I'll do it later
    </p>
  </div>
</div>
