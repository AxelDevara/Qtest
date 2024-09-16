<script>
  import { toastSuccess } from '@lib/utils/toast';

  export let text;

  const copyCode = () => {
    navigator.clipboard.writeText('15OFF');
    toastSuccess('Promo code copied');
  };
</script>

<div
  class="bg-blue-600 w-full py-2 text-center cursor-pointer text-white"
  on:click={copyCode}
>
  {text}
</div>
