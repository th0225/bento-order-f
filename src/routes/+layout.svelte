<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import Appbar from './appbar.svelte';

  let { children } = $props();
</script>

<div class="min-h-screen bg-calico-bg dark:bg-dark-bg">
  <Appbar />

  <main>
    {@render children()}
  </main>
</div>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
