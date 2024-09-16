<script>
  import { inView, isInViewTriggered } from '@lib/stores/intersectingStore';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let background, isLoading, theme;
  let isMounted = false;

  onMount(() => {
    isMounted = true;
  });
</script>

<div class={`text-xl wrapper text-white ${$$props.class}`}>
  {#if isLoading}
    <div
      style={`--border-color: ${theme?.loadingBorder};`}
      class={`rounded-xl flex justify-items-center items-center aspect-square mx-auto border-6 object-cover w-36 h-36`}
      class:box={isMounted}
    >
      <img
        in:fade|local
        src="/favicon.svg"
        width="80px"
        height="80px"
        class="mx-auto"
        alt="avatar"
      />
    </div>
  {:else}
    <img
      width={`${$$props.width}`}
      height={`${$$props.height}`}
      class="flex justify-items-center items-center aspect-square {$inView
        ? 'mx-auto border-8 rounded-3xl'
        : 'mt-2 ml-4 border-4 rounded-xl'} object-cover {theme.avatarBorder}"
      class:growup={$inView && $isInViewTriggered}
      class:shrink={!$inView}
      class:fadeIn={!$isInViewTriggered}
      alt="Avatar"
      src={background ?? '/favicon.svg'}
    />
  {/if}
</div>

<style>
  @property --angle {
    syntax: '<angle>';
    initial-value: 90deg;
    inherits: true;
  }

  .growup {
    animation: growup 1s linear 1;
    -webkit-animation: growup 1s linear 1;
  }

  .shrink {
    animation: shrink 1s linear 1;
    -webkit-animation: shrink 1s linear 1;
  }

  .fadeIn {
    animation: fadeIn 0.5s linear 1;
    -webkit-animation: fadeIn 0.5s linear 1;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes shrink {
    0% {
      transform: translate(122px, 60px) scale(2);
    }
    100% {
      transform: translateX(0px) translateY(0px);
    }
  }

  @-webkit-keyframes growup {
    0% {
      transform: translateX(-120px) translateY(-40px) scale(0.5);
    }
    100% {
      transform: translateX(0px) translateY(0px);
    }
  }

  @keyframes shrink {
    0% {
      transform: translate(122px, 60px) scale(2);
      /* -webkit-transform: translate(122px, 60px) scale(2); */
    }

    100% {
      transform: translateX(0px) translateY(0px);
      /* -webkit-transform: translateX(0px) translateY(0px); */
    }
  }

  @keyframes growup {
    0% {
      transform: translateX(-120px) translateY(-40px) scale(0.5);
      /* -webkit-transform: translateX(-120px) translateY(-40px) scale(0.5); */
    }

    100% {
      transform: translateX(0px) translateY(0px);
      /* -webkit-transform: translateX(0px) translateY(0px); */
    }
  }

  :root {
    --angle: 90deg;
    --c2: black;
  }

  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
  .box {
    position: relative;
    z-index: 0;
    border-radius: 35px;
    overflow: hidden;
    padding: 2rem;
  }
  .box::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(var(--border-color), var(--border-color)),
      linear-gradient(var(--border-color), var(--border-color)),
      linear-gradient(#020202, #020202), linear-gradient(#020202, #020202);
    animation: rotate 500ms linear infinite;
  }
  .box::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: black;
    border-radius: 35px;
  }
</style>
