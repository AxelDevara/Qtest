<script>
  //   throw new Error(
  //     '@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)'
  //   );

  import CardWrapper from '@comp/cards/cardWrapper.svelte';

  export let data;

  let { invoice, invoiceId } = data;

  //   export let invoice;
  //   export let invoiceId;
</script>

<svelte:head>
  <title>Qubic | Invoice</title>
</svelte:head>
<div class="min-h-screen">
  <div class="p-20 text-white flex justify-center items-center">
    <CardWrapper class="w-full max-w-xl h-full flex flex-col p-10">
      {#if invoice}
        <h1 class="font-bold uppercase text-xl mb-4">
          Order No. <span class="text-green-300">{invoiceId}</span>
        </h1>
        <p>{invoice.status}</p>
        <p class="text-neutral-400">
          Here is your invoice for order <span class="text-green-300"
            >{invoiceId}</span
          >. Please find the details below to be correct. Otherwise, please
          <a href="https://wa.me/628113087599">let us know!.</a>
        </p>
        <h1 class="text-bold text-xl mb-4 mt-4">Items</h1>
        <table class="w-full">
          <tr>
            <th class="text-left"> Description </th>
            <th class="text-left"> Price </th>
          </tr>
          {#each invoice.cart as item}
            <tr>
              <td>
                <p>{item.product.name}</p>
              </td>
              <td>
                <p>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(item.product.price)}
                </p>
              </td>
            </tr>
          {/each}
        </table>

        <div class="self-start mt-6">
          <p class="text-neutral-400">Total Due</p>
          <p class="text-lg font-bold">{invoice.total}</p>
          <p class="text-neutral-400">Payment Method</p>
          <p class="text-lg font-bold">
            {invoice.bank + ' ' + invoice.method ?? '-'}
          </p>
          {#if invoice.va}
            <p class="text-neutral-400">Virtual Account Address</p>
            <p class="text-lg font-bold">{invoice.va}</p>
          {/if}
          <p class="text-neutral-400">Valid Before</p>
          <p class="text-lg font-bold">{invoice.expiry_date}</p>
        </div>
      {:else}
        <p>Invoice not found</p>
      {/if}
    </CardWrapper>
  </div>
</div>
