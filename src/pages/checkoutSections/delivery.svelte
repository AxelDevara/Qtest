<script>
  import { fade } from 'svelte/transition';
  import { addShippingDetails } from '@lib/stores/cartStore';
  import { toastFailed } from '@lib/utils/toast';
  import { user } from '@lib/stores/userStore';
  import Spinner from '@comp/loading/spinner.svelte';
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from '@rgossiaux/svelte-headlessui';
  import { onMount } from 'svelte';
  import { setRajaOngkir } from '@lib/stores/rajaOngkirStore';

  export let nextStep;
  export let prevStep;
  export let loading;

  let delivery = {
    id: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    province: '',
    email: $user ? $user.email : '',
  };
  let cities = [];
  let isLoading = false;

  const getCityRajaOngkir = async () => {
    try {
      isLoading = true;
      let url =
        'https://tnk7uosg2w2o7x2bietrwz6z5m0rxdfd.lambda-url.ap-southeast-1.on.aws/';

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: 'city',
        }),
      });

      const data = await res.json();

      cities = data.rajaongkir.results.map((city) => {
        return {
          name: city.city_name,
          postalCode: city.postal_code,
          id: city.city_id,
          province: city.province,
        };
      });
      isLoading = false;
    } catch (error) {
      isLoading = false;
      console.log(error);
    }
  };

  const selectCity = (city) => {
    delivery.id = city.id;
    delivery.city = city.name;
    delivery.postalCode = city.postalCode;
    delivery.province = city.province;
  };

  const getCostRajaOngkir = async () => {
    try {
      let url =
        'https://tnk7uosg2w2o7x2bietrwz6z5m0rxdfd.lambda-url.ap-southeast-1.on.aws/';
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: 'cost',
          origin: 444,
          destination: delivery.id,
          weight: 1,
          courier: 'jne',
        }),
      });

      const data = await res.json();
      setRajaOngkir(data.rajaongkir);
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutHandler = async () => {
    if (
      delivery.firstname === '' ||
      delivery.lastname === '' ||
      delivery.address === '' ||
      delivery.city === '' ||
      delivery.postalCode === '' ||
      delivery.phone === '' ||
      delivery.email === ''
    ) {
      toastFailed('Please fill all the fields');
    } else {
      addShippingDetails(delivery);
      await getCostRajaOngkir();
      nextStep();
    }
  };

  onMount(async () => await getCityRajaOngkir());
</script>

<div class="flex flex-col items-center w-full" in:fade={{ duration: 300 }}>
  <div
    class="flex flex-col rounded-xl h-auto w-full text-white m-8 mt-4 md:mt-12 p-5"
  >
    <h1 class="font-bold text-2xl mb-4">Shipping Information</h1>
    <div class="flex md:flex-row flex-col w-full gap-4">
      <div class="py-2 md:py-4 text-neutral-300 flex flex-col w-full">
        <label
          for="name"
          class="after:content-['*'] after:text-red-500 after:ml-0.5"
          >Firstname</label
        >
        <input
          type="text"
          class="border-2 border-neutral-600 mt-3 p-2 bg-neutral-700"
          placeholder="Name"
          bind:value={delivery.firstname}
        />
      </div>
      <div class="py-2 md:py-4 text-neutral-300 flex flex-col w-full">
        <label
          for="name"
          class="after:content-['*'] after:text-red-500 after:ml-0.5"
          >Lastname</label
        >
        <input
          type="text"
          class="border-2 border-neutral-600 mt-3 p-2 bg-neutral-700"
          placeholder="Name"
          bind:value={delivery.lastname}
        />
      </div>
    </div>

    <div class="py-4 text-neutral-300 flex flex-col">
      <label
        for="address"
        class="after:content-['*'] after:text-red-500 after:ml-0.5"
        >Delivery Address</label
      >
      <input
        type="text"
        class="border-2 border-neutral-600 mt-3 p-2 bg-neutral-700"
        placeholder="Address"
        bind:value={delivery.address}
      />
    </div>
    <div class="flex w-full justify-between py-4">
      <div
        class="flex-1 w-full flex flex-col justify-between mr-4 text-neutral-300"
      >
        <label
          for="city"
          class="after:content-['*'] after:text-red-500 after:ml-0.5"
          >City</label
        >
        <Menu>
          <MenuButton
            class="border-2 w-full border-neutral-600 mt-3 p-2 bg-neutral-700 hover:bg-neutral-500 text-left"
            >{delivery.city === '' ? 'Select City' : delivery.city}</MenuButton
          >
          <MenuItems
            class="border-2 flex flex-col w-48 lg:w-80 h-56 overflow-y-auto shadow-md border-neutral-600 mt-3 p-2 bg-neutral-700 z-40 absolute"
          >
            {#if isLoading === true}
              <MenuItem class="w-full bg-neutral-600 h-10 animate-pulse mb-2" />
              <MenuItem class="w-full bg-neutral-600 h-10 animate-pulse mb-2" />
              <MenuItem class="w-full bg-neutral-600 h-10 animate-pulse mb-2" />
              <MenuItem class="w-full bg-neutral-600 h-10 animate-pulse mb-2" />
              <MenuItem class="w-full bg-neutral-600 h-10 animate-pulse mb-2" />
              <MenuItem class="w-full bg-neutral-600 h-10 animate-pulse mb-2" />
            {:else}
              {#each cities as city}
                <MenuItem
                  class="hover:bg-neutral-500 p-2"
                  on:click={() => selectCity(city)}
                >
                  <span>{city.name}</span>
                </MenuItem>
              {/each}
            {/if}
          </MenuItems>
        </Menu>
      </div>

      <div class="flex-1 w-full flex flex-col text-neutral-300">
        <label
          for="postal"
          class="after:content-['*'] after:text-red-500 after:ml-0.5"
          >Postal Code</label
        >
        <input
          type="text"
          class="border-2 w-full border-neutral-600 mt-3 p-2 bg-neutral-700"
          placeholder="Postal Code"
          bind:value={delivery.postalCode}
        />
      </div>
    </div>
    <div class="py-4 text-neutral-300 flex flex-col">
      <label
        for="phone"
        class="after:content-['*'] after:text-red-500 after:ml-0.5"
        >Phone Number</label
      >
      <input
        type="text"
        class="border-2 border-neutral-600 mt-3 p-2 bg-neutral-700"
        placeholder="Phone Number"
        bind:value={delivery.phone}
      />
    </div>
    <div class="py-4 text-neutral-300 flex flex-col">
      <label
        for="email"
        class="after:content-['*'] after:text-red-500 after:ml-0.5"
        >Email Address</label
      >
      <input
        type="email"
        class="border-2 border-neutral-600 mt-3 p-2 bg-neutral-700"
        placeholder="Email Address"
        bind:value={delivery.email}
      />
    </div>
  </div>
  <div class="flex w-full">
    <button
      class="bg-neutral-600 hover:bg-neutral-500 hover:border-neutral-200 hover:border rounded-md text-white p-4 mr-4 w-full"
      on:click={prevStep}>Back</button
    >
    <button
      class="bg-blue-600 hover:border-neutral-200 rounded-md hover:border text-white p-4 w-full flex justify-center items-center"
      on:click={checkoutHandler}
    >
      {#if loading}
        <div class="flex flex-row">
          <Spinner class="h-5 w-5 pr-2 border-black mr-4" /> Loading...
        </div>
      {:else}
        Payment Method
      {/if}
    </button>
  </div>
</div>
