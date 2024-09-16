<script>
  export let basePrice = 250000;
  export let isHidePriceText = false;
</script>

<div class="flex flex-row text-lg md:text-2xl">
  <p class={`${isHidePriceText ? 'hidden' : 'flex-grow'}`}>Price</p>
  <p>
    {new Intl.NumberFormat('id', {
      currency: 'IDR',
      style: 'currency',
    }).format(basePrice)}
  </p>
</div>
<div class="hidden flex-row">
  <p>
    {new Intl.NumberFormat('id', {
      currency: 'IDR',
      style: 'currency',
    }).format(basePrice)}
  </p>
</div>
<div class="hidden flex-row">
  <p class="flex-grow">Total</p>
  <p class=" text-green-400">
    {new Intl.NumberFormat('id', {
      currency: 'IDR',
      style: 'currency',
    }).format(basePrice)}
  </p>
</div>
