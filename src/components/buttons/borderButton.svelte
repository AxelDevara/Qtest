<script>
  export let order = 1;
</script>

<button
  on:click
  class={`outline outline-1 subpixel-antialiased text-xs tracking-wide ${$$props.class}`}
  style={`--animation-order: ${order};`}><slot /></button
>

<style>
  button {
    animation-name: animateIn;
    animation-duration: 350ms;
    animation-delay: calc(var(--animation-order) * 100ms);
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
  }

  @keyframes animateIn {
    0% {
      opacity: 0;
      transform: scale(0.6) translateY(-8px);
    }

    100% {
      opacity: 1;
    }
  }
</style>
