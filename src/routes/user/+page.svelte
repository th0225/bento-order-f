<script lang="ts">
  import { onMount } from 'svelte';

  interface User {
    id: number;
    account: string;
    name: string;
    role: string;
  }

  let users: User[] = [
    { id: 1, account: 'admin', name: '管理員', role: 'admin' },
    { id: 2, account: 'user1', name: '使用者一', role: 'user' }
  ];
  let account = '';
  let name = '';
  let password = '';
  let loading = false;
  let errorMsg = '';

  // 取得使用者清單
  async function loadUsers() {
    const res = await fetch('http://localhost:5162/user/users');
    users = await res.json();

    console.log(users);
  }

  // 新增使用者
  async function addUser() {
    if (!account || !name || !password) {
      errorMsg = '請輸入完整資料';
      return;
    }

    loading = true;
    errorMsg = '';

    const res = await fetch('http://localhost:5162/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, name, password })
    });

    if (res.ok) {
      await loadUsers();
      account = '';
      name = '';
      password = '';
    } else {
      errorMsg = '新增使用者失敗';
    }

    loading = false;
  }

  // 刪除使用者
  async function deleteUser(id: number) {
    if (!confirm(`確定要刪除使用者 ID = ${id} ?`)) return;

    const res = await fetch(`http://localhost:5162/users/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      users = users.filter((u) => u.id !== id);
    } else {
      alert('刪除失敗');
    }
  }

  onMount(loadUsers);
</script>

<div class="space-y-6">
  <!-- Table: 使用者列表 -->
  <div>
    <table class="min-w-full overflow-hidden rounded-lg shadow-lg">
      <thead
        class="bg-calico-secondary text-calico-black dark:bg-dark-secondary
                    dark:text-dark-black"
      >
        <tr>
          <th class="px-3 py-2 text-left">ID</th>
          <th class="px-3 py-2 text-left">Account</th>
          <th class="px-3 py-2 text-left">Name</th>
          <th class="px-3 py-2 text-left">Role</th>
          <th class="px-3 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr
            class="border-b bg-calico-bg text-calico-black hover:bg-gray-200
                    dark:bg-dark-bg dark:text-dark-black dark:hover:bg-slate-700"
          >
            <td class="px-3 py-2">{user.id}</td>
            <td class="px-3 py-2">{user.account}</td>
            <td class="px-3 py-2">{user.name}</td>
            <td class="px-3 py-2">{user.role}</td>
            <td class="px-3 py-2 text-right">
              <button
                on:click={() => deleteUser(user.id)}
                class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                刪除
              </button>
            </td>
          </tr>
        {/each}
        <tr
          class="border-b bg-calico-bg text-calico-black hover:bg-gray-200
              dark:bg-dark-bg dark:text-dark-black dark:hover:bg-slate-700"
        >
          <td class="px-3 py-2">
            <input class="border rounded px-2 py-1 w-full">
          </td>
          <td class="px-3 py-2"></td>
          <td class="px-3 py-2"></td>
          <td class="px-3 py-2"></td>
          <td class="px-3 py-2 text-right">
            <button
              class="rounded bg-sky-500 px-3 py-1 text-sm text-white hover:bg-sky-600"
            >
              新增
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
