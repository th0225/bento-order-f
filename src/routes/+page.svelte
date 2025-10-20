<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';

  let account = '';
  let password = '';
  let error = '';

  function handleLogin() {
    error = '';
    if (!account || !password) {
      error = '請填寫完整資料';
      return;
    }

    if (account === 'admin' && password === '1234') {
      authStore.set({
        isLoggedIn: true,
        user: { name: 'admin', id: 'A000000', level: 0 }
      });
      localStorage.setItem('auth', JSON.stringify(get(authStore)));
      goto('/order');
    } else if (account === 'user1' && password === '1234') {
      authStore.set({
        isLoggedIn: true,
        user: { name: 'user1', id: 'A001000', level: 1 }
      });
      localStorage.setItem('auth', JSON.stringify(get(authStore)));
      goto('/order');
    } else {
      error = '帳號或密碼錯誤';
      return;
    }

    console.log('登入資料:', { account, password });
  }
</script>

<div class="flex min-h-screen items-center justify-center">
  <div
    class="w-full max-w-md rounded-xl bg-calico-secondary p-8 shadow-lg
            dark:bg-dark-secondary"
  >
    <!-- 標題 -->
    <div class="mb-6 text-center">
      <h1 class="text-3xl font-bold text-calico-text dark:text-dark-text">請輸入帳號密碼</h1>
    </div>

    <!-- 表單 -->
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <div>
        <label
          for="account"
          class="mb-1 block text-sm font-medium text-calico-text dark:text-dark-text"
        >
          帳號
        </label>
        <input
          id="account"
          type="text"
          bind:value={account}
          placeholder="A012345"
          class="w-full rounded-lg border border-calico-soft bg-calico-bg px-4 py-2
                focus:ring-2 focus:ring-calico-orange focus:outline-none
                dark:border-gray-600 dark:bg-dark-bg dark:text-gray-100"
        />
      </div>

      <div>
        <label
          for="password"
          class="mb-1 block text-sm font-medium text-calico-text dark:text-dark-text"
        >
          密碼
        </label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="••••••••"
          class="w-full rounded-lg border border-calico-soft bg-calico-bg px-4 py-2
                focus:ring-2 focus:ring-calico-orange focus:outline-none
                dark:border-gray-600 dark:bg-dark-bg dark:text-gray-100"
        />
      </div>

      {#if error}
        <p class="text-sm text-red-500">{error}</p>
      {/if}

      <button
        type="submit"
        class="dark:bg-orange-orange mt-4 w-full rounded-lg bg-calico-orange py-2 font-medium
              text-calico-text transition-colors hover:bg-calico-hover
              dark:text-dark-text dark:hover:bg-dark-hover"
      >
        登入
      </button>
    </form>
  </div>
</div>
