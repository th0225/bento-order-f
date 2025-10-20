import { writable } from 'svelte/store';

export const authStore = writable({
  isLoggedIn: false,
  user: null as null | { id: string; name: string; level: number }
});
