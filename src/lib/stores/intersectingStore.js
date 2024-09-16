import { writable } from 'svelte/store';

// arr, if in view push to arr, if out of view remove from arr
export const inView = writable(true);
export const isInViewTriggered = writable(false);
