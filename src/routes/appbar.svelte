<script lang="ts">
  import { onMount } from 'svelte';
  import { Menu, Ham, Sun, Moon, Github } from '@lucide/svelte';
  import { initTheme, toggleTheme } from '$lib/theme';

  import Sidebar from '$lib/components/Sidebar.svelte';

  // 是否為深色模式
  let isDark = false;
  // 切換主題顏色
  function changeTheme() {
    toggleTheme();
    isDark = document.documentElement.classList.contains('dark');
  }
  onMount(() => {
    // 檢查主題顏色
    initTheme();
    isDark = document.documentElement.classList.contains('dark');
  });

  let sidebarOpen = false;

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div class="bg-calico-bg dark:bg-dark-bg">
  <!-- Appbar -->
  <nav
    class="mb-4 bg-calico-secondary
        px-4 py-3 text-calico-black dark:bg-dark-secondary dark:text-dark-black"
  >
    <div class="container mx-auto flex items-center justify-between">
      <button
        class="flex cursor-pointer items-center gap-2 hover:text-gray-500
										md:hidden"
        on:click={toggleSidebar}
      >
        <Menu />
      </button>

      <!-- 左側logo -->
      <div class="flex items-center gap-2 text-xl font-semibold">
        <Ham />
        <span class="text-xl font-semibold">Bento Order</span>
      </div>

      <!-- 主題顏色切換 -->
      <div class="flex items-center gap-6">
        <button
          on:click={changeTheme}
          aria-label="切換主題顏色"
          class="flex cursor-pointer items-center gap-2 hover:text-gray-500"
        >
          {#if isDark}
            <Moon size="24" />
          {:else}
            <Sun size="24" />
          {/if}
        </button>
        <a
          href="https://github.com/th0225/bento-order-f"
          class="block flex items-center gap-2 hover:text-gray-500"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size="24" />
        </a>
      </div>
    </div>
  </nav>

  <div class="flex">
    <Sidebar isOpen={sidebarOpen} onClose={() => (sidebarOpen = false)} />
  </div>
</div>
