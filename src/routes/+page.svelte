<script lang="ts">
  import { clearAuth, clearToken, setAuth, setToken } from '$lib/api';
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  let account = '';
  let password = '';
  let error = '';

  async function handleLogin() {
    error = '';
    if (!account || !password) {
      error = '請填寫完整資料';
      return;
    }

    // 向後端發送登入請求
    const res = await fetch('http://localhost:5162/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ account, password })
    });

    // 登入失敗
    if (!res.ok) {
      authStore.set({
        isLoggedIn: false,
        user: null
      });
      clearToken();
      clearAuth();
      error = '帳號或密碼錯誤';
      return;
    }

    // 登入成功，處理回應資料
    const data = await res.json();
    console.log('登入回應資料:', data);
    authStore.set({
      isLoggedIn: true,
      user: {
        id: data.id,
        account: data.account,
        name: data.name,
        role: data.role
      }
    });

    // 儲存認證狀態
    setAuth(JSON.stringify(get(authStore)));
    setToken(data.token);

    if (data.role == 'user') {
      // 導向訂餐頁面
      goto('/order');
    } else {
      // 導向訂餐頁面
      goto('/statistics');
    }
  }

  onMount(() => {
    // 檢查登入狀態
    const saved = localStorage.getItem('auth');
    if (!saved) {
      return;
    }

    authStore.set(JSON.parse(saved));

    if (!$authStore.isLoggedIn) {
      return;
    }

    if ($authStore.user?.role === 'user') {
      // 導向訂餐頁面
      goto('/order');
    } else {
      // 導向訂餐頁面
      goto('/statistics');
    }
  });
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
