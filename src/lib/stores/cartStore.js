import { writable } from 'svelte/store';

export const cart = writable([]);
export const xenditCart = writable([]);
// export const cart = writable([]);
export const shippingDetails = writable();

export const addShippingDetails = (delivery) => {
  shippingDetails.set(delivery);
};

export const addCart = (addedCart) => {
  cart.update((cart) => {
    let newCart = [...cart, addedCart];
    return newCart;
  });
};

export const addCartForXendit = (addedCart) => {
  xenditCart.update((cart) => {
    let newCart = [...cart, addedCart];
    return newCart;
  });
};

export const removeItem = (i) => {
  cart.update((cart) => {
    let arr = cart.filter((oldItem, index) => index !== i);
    return arr;
  });
  xenditCart.update((cart) => {
    let arr = cart.filter((oldItem, index) => index !== i);
    return arr;
  });
};

export const deleteAllCart = () => {
  cart.set([]);
};

export const deleteXenditCart = () => {
  xenditCart.set([]);
};
