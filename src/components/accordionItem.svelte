<script>
  import { slide } from 'svelte/transition';

  export let title;
  export let content;
</script>

<details>
  <summary
    class="my-2 w-full p-4 cursor-pointer bg-neutral-800 border border-neutral-700"
  >
    {title}
  </summary>
  <div
    class="w-full p-4 pl-6"
    transition:slide|local={{
      duration: 500,
    }}
  >
    {#each content as item}
      <ul class="list-[square]">
        <li>{item}</li>
      </ul>
    {/each}
  </div>
</details>
