import { writable } from 'svelte/store';

export const rajaOngkir = writable(null);

export const setRajaOngkir = (data) => {
  rajaOngkir.set(data);
};
