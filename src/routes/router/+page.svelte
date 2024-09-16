<script>
  // throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");
  export let data;

  let { error } = data;
</script>

<div
  class="bg-black bg-[url(/polka.png)] flex mx-auto justify-center items-center min-h-screen"
>
  {#if error}
    <div
      class="bg-neutral-900 h-screen justify-center items-center flex flex-col text-center text-white w-full md:w-96 text-lg"
    >
      <h1 class="font-bold text-2xl">404</h1>
      <h2>Invalid URL</h2>
    </div>
  {/if}
</div>
