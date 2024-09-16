<script>
  import CardWrapper from '@comp/cards/cardWrapper.svelte';
  import { homepageImage } from '@lib/constants';
  import { toastSuccess } from '@lib/utils/toast';

  let fullName = '';
  let email = '';
  let title = '';
  let message = '';

  const handleSubmit = async () => {
    const res = await fetch(
      'https://hqq2d3h5bh2j3eadvvudnfxe740lbuts.lambda-url.ap-southeast-1.on.aws/',
      {
        method: 'POST',
        body: JSON.stringify({
          subject: title,
          email: email,
          fullName: fullName,
          message: message,
        }),
      }
    );

    toastSuccess('Email sent');
    fullName = '';
    email = '';
    title = '';
    message = '';
  };
</script>

<svelte:head>
  <title>Qubic Card | Contact Us</title>
  <meta
    name="description"
    content="Qubic card adalah smart digital business card yang dapat dibuat dengan design dan material custom. Team support kami selalu siap sedia melayani permintaan dan kebutuhan anda."
  />
  <meta itemprop="image" content={homepageImage.blackLogo} />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div
  class="flex flex-col justify-center items-center min-h-screen rounded-md bg-black text-white px-8"
  id="contactus"
>
  <h1 class="font-light text-5xl">Contact Us</h1>
  <div class="flex flex-col mt-8 text-center items-center w-full lg:w-1/2">
    <p class="text-neutral-500">
      We would like to hear from you! Typically, we will reply within 24 hours!
    </p>
    <p class="text-neutral-500">
      Urgent inquiry? Hit us up over Whatsapp at <a
        class="underline text-white"
        href="https://wa.me/628113087599">+62 811 3087599</a
      >
    </p>
  </div>
  <!-- <CardWrapper
    class="flex flex-col rounded-md justify-evenly p-8 w-full lg:w-1/2 min-h-[500px] mt-8"
  >
    <input
      type="text"
      placeholder="Full Name"
      class="p-2 bg-neutral-700 mb-4"
      bind:value={fullName}
    />
    <input
      type="text"
      placeholder="Your Email"
      class="p-2 bg-neutral-700 mb-4"
      bind:value={email}
    />
    <input
      type="text"
      placeholder="Title"
      class="p-2 bg-neutral-700 mb-4"
      bind:value={title}
    />
    <textarea
      placeholder="Type your message here..."
      class="p-2 h-48 bg-neutral-700 mb-4"
      bind:value={message}
    />
    <button class="bg-blue-600 text-white p-3" on:click={handleSubmit}
      >Send Email</button
    >
  </CardWrapper> -->
</div>
