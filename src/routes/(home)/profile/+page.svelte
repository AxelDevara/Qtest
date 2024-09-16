<script>
  import { homepageImage } from '@lib/constants';
</script>

<svelte:head>
  <title>Qubic Profile</title>
  <meta
    name="description"
    content="Have a look at our demo profile and see for yourself how good Qubic card looks."
  />
  <meta itemprop="image" content={homepageImage.whiteLogo} />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Qubic Card | Get a Card" />
  <meta
    itemprop="description"
    content="Have a look at our demo profile and see for yourself how good Qubic card looks."
  />
  <meta itemprop="image" content={homepageImage.whiteLogo} />

  <!-- Facebook Metatag -->
  <meta property="og:url" content="https://qubic.id" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Qubic Card | Get a Card" />
  <meta
    property="og:description"
    content="Have a look at our demo profile and see for yourself how good Qubic card looks."
  />
  <meta property="og:image" content={homepageImage.whiteLogo} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Qubic Card | Get a Card" />
  <meta
    name="twitter:description"
    content="Have a look at our demo profile and see for yourself how good Qubic card looks."
  />
  <meta name="twitter:image" content={homepageImage.whiteLogo} />
  <meta name="robots" content="index, follow" />
</svelte:head>
