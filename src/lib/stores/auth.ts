import { writable } from 'svelte/store';

export const authStore = writable({
  isLoggedIn: false,
  user: null as null | { id: number; account: string; name: string; role: string }
});
