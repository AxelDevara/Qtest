<script>
  import { qubicGradient } from '@lib/constants';
</script>

<div class={`${qubicGradient} flex ${$$props.class}`}>
  <button
    style="margin: 1.25px;"
    class="bg-black text-white px-8 text-sm py-1"
    on:click><slot /></button
  >
</div>
