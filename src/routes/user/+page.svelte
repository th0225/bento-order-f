<script lang="ts">
  import { onMount } from 'svelte';

  interface User {
    id: number;
    account: string;
    name: string;
    role: string;
  }

  let users: User[] = [];
  let account = '';
  let name = '';

  const apiUrl = 'http://localhost:5162/user';

  function getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  // 取得使用者清單
  async function loadUsers() {
    try {
      const res = await fetch(`${apiUrl}/get`, {
        method: 'GET',
        credentials: 'include',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`載入失敗: ${res.status}`);
      users = await res.json();
    } catch (err) {
      console.error(err);
    }
  }

  // 新增使用者
  async function addUser() {
    if (!account || !name) return;

    try {
      const res = await fetch(`${apiUrl}/add`, {
        method: 'POST',
        credentials: 'include',
        headers: getHeaders(),
        body: JSON.stringify({ account, password: account, name, role: 'user' })
      });
      if (!res.ok) throw new Error(`新增失敗: ${res.status}`);
      account = '';
      name = '';
      await loadUsers();
    } catch (err) {
      console.error(err);
    }
  }

  // 刪除使用者
  async function deleteUser(id: number) {
    if (!confirm(`確定要刪除使用者 ID = ${id} ?`)) return;
    try {
      const res = await fetch(`${apiUrl}/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`刪除失敗: ${res.status}`);
      users = users.filter((u) => u.id !== id);
    } catch (err) {
      console.error(err);
    }
  }

  onMount(loadUsers);
</script>

<div class="mx-auto flex max-w-4xl justify-center space-y-6">
  <!-- Table: 使用者列表 -->
  <div>
    <table class="w-full min-w-full table-fixed overflow-hidden rounded-lg shadow-lg">
      <thead
        class="bg-calico-secondary text-calico-black dark:bg-dark-secondary
          dark:text-dark-black"
      >
        <tr>
          <th class="w-1/12 px-3 py-2 text-left">ID</th>
          <th class="w-3/12 px-3 py-2 text-left">Account</th>
          <th class="w-3/12 px-3 py-2 text-left">Name</th>
          <th class="w-2/12 px-3 py-2 text-left">Role</th>
          <th class="w-3/12 px-3 py-2 text-right">Action</th>
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
              {#if user.role !== 'admin'}
                <button
                  on:click={() => deleteUser(user.id)}
                  class="cursor-pointer rounded bg-red-500 px-3 py-1 text-sm text-white
                    transition-colors hover:bg-red-600"
                >
                  刪除
                </button>
              {/if}
            </td>
          </tr>
        {/each}

        <!-- 新增列 -->
        <tr
          class="border-b bg-calico-bg text-calico-black hover:bg-gray-200
                 dark:bg-dark-bg dark:text-dark-black dark:hover:bg-slate-700"
        >
          <td class="px-3 py-2"></td>
          <td class="px-3 py-2">
            <input
              type="text"
              bind:value={account}
              placeholder="Account"
              class="box-border w-full rounded border p-1 focus:ring-2
                focus:ring-calico-orange focus:outline-none"
            />
          </td>
          <td class="px-3 py-2">
            <input
              type="text"
              bind:value={name}
              placeholder="Name"
              class="box-border w-full rounded border p-1 focus:ring-2
                focus:ring-calico-orange focus:outline-none"
            />
          </td>
          <td class="px-3 py-2"></td>
          <td class="px-3 py-2 text-right">
            <button
              type="submit"
              on:click={() => addUser()}
              class="cursor-pointer rounded bg-sky-500 px-3 py-1 text-sm text-white
                transition-colors hover:bg-sky-600"
            >
              新增
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
