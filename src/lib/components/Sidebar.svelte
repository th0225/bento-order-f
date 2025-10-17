<script lang="ts">
  import { X, House, ChartBar, LogOut } from '@lucide/svelte';

  export let isOpen = false;
  export let onClose: () => void;
</script>

<!-- 桌機版 -->
<aside
  class="hidden md:fixed md:top-13 md:left-0 md:block md:h-[calc(100vh-56px)]
    md:w-32 md:bg-calico-secondary
    md:text-calico-text md:dark:border-gray-700 md:dark:bg-dark-secondary
    md:dark:text-dark-text"
>
  <nav class="space-y-2 p-4">
    <a href="/" class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
      <House size={18} /> 首頁
    </a>
    <a href="/" class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
      <ChartBar size={18} /> 統計
    </a>
    <a href="/" class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
      <LogOut size={18} /> 登出
    </a>
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
      <a href="/" class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
        <House /> 首頁
      </a>
      <a href="/" class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
        <ChartBar /> 報表
      </a>
      <a href="/" class="flex items-center gap-2 rounded p-2 hover:text-gray-500">
        <LogOut /> 登出
      </a>
    </nav>
  </div>
{/if}
