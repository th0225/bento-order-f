<script lang="ts">
  import { clearAuth, clearToken } from '$lib/api';
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  import { X, User, SquarePen, ChartBar, LogOut } from '@lucide/svelte';

  export let isOpen = false;
  export let onClose: () => void;

  function logout() {
    authStore.set({ isLoggedIn: false, user: null });
    clearAuth();
    clearToken();
    goto('/');
  }
</script>

<!-- 桌機版 -->
<aside
  class="hidden min-h-screen md:fixed md:top-13 md:left-0 md:block
    md:h-[calc(100vh-56px)] md:w-32 md:bg-calico-secondary
    md:text-calico-text md:dark:border-gray-700 md:dark:bg-dark-secondary
    md:dark:text-dark-text"
>
  <nav class="space-y-2 p-4">
    <div class="mb-8 flex items-center gap-2 font-bold">
      <User />{$authStore.user?.name}
    </div>
    <a href="/order" class="flex items-center gap-2 p-2 hover:text-gray-500">
      <SquarePen size={18} /> 訂餐
    </a>

    {#if $authStore.user?.role == 'admin'}
      <a href="/statistics" class="flex items-center gap-2 p-2 hover:text-gray-500">
        <ChartBar size={18} /> 統計
      </a>
    {/if}

    <button
      on:click={logout}
      class="flex cursor-pointer items-center gap-2 p-2 hover:text-gray-500"
    >
      <LogOut size={18} /> 登出
    </button>
  </nav>
</aside>

<!-- 手機版 -->
{#if isOpen}
  <div
    class="fixed top-0 left-0 z-50 w-full bg-calico-secondary
            md:hidden dark:bg-dark-secondary"
  >
    <div
      class="flex items-center justify-between border-b border-gray-200 p-4
      dark:border-gray-700 dark:text-dark-text"
    >
      <button class="flex items-center gap-2 rounded p-2 hover:text-gray-500" on:click={onClose}>
        <X />
      </button>
    </div>
    <nav class="space-y-2 p-4 dark:text-dark-text">
      <a href="/order" class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
        <SquarePen /> 訂餐
      </a>
      <a href="/statistics" class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
        <ChartBar /> 統計
      </a>
      <button on:click={logout} class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
        <LogOut /> 登出
      </button>
    </nav>
  </div>
{/if}
