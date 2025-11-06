<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { clearAuth, clearToken } from '$lib/api';
  import { Menu, Ham, User, Sun, Moon, Github } from '@lucide/svelte';
  import { initTheme, toggleTheme } from '$lib/theme';

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

  function logout() {
    authStore.set({ isLoggedIn: false, user: null });
    clearAuth();
    clearToken();
    goto('/');
  }
</script>

<div class="bg-calico-bg dark:bg-dark-bg">
  <!-- Appbar -->
  <nav
    class="mb-4 bg-calico-secondary
        px-4 py-3 text-calico-black dark:bg-dark-secondary dark:text-dark-black"
  >
    <div class="container mx-auto flex items-center justify-between">
      <!-- 左側logo -->
      <div class="flex items-center gap-2 text-xl font-semibold">
        <Ham size="28"/>
        <span class="sm:text-2xl font-semibold">Bento Order</span>
      </div>

      <!-- 右側 -->
      <div class="flex items-center gap-8">
        <!-- 使用者名稱及登出 -->
        <div class="flex items-center gap-3">
          <User />{$authStore.user?.name}
          <button
            on:click={logout}
            class="dark:bg-orange-orange rounded-lg bg-calico-orange px-4 py-1 font-medium
              text-calico-text transition-colors hover:bg-calico-hover cursor-pointer
              dark:text-dark-text dark:hover:bg-dark-hover"
          >
            登出
          </button>
        </div>

        <!-- 切換主題顏色、github-->
        <div class="flex items-center gap-3">
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
    </div>
  </nav>

  <!-- <div class="flex">
    <Sidebar isOpen={sidebarOpen} onClose={() => (sidebarOpen = false)} />
  </div> -->
</div>
