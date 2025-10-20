<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';

  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import Appbar from './appbar.svelte';

  let { children } = $props();

  onMount(() => {
    // 檢查登入狀態
    const saved = localStorage.getItem('auth');
    if (!saved) {
      return;
    }

    authStore.set(JSON.parse(saved));
  });
</script>

<div class="min-h-screen bg-calico-bg dark:bg-dark-bg">
  {#if $authStore.isLoggedIn}
    <Appbar />
  {/if}

  <main>
    {@render children()}
  </main>
</div>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
