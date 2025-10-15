<script lang="ts">
	// 引入icon
	import { Ham, Sun, Moon, Github } from '@lucide/svelte';
	import { initTheme, toggleTheme } from '$lib/theme';
	// Appbar名稱
	export let title = 'My App';
	// 是否為深色模式
	let isDark = false;
	// 切換主題顏色
	function changeTheme() {
		toggleTheme();
		isDark = document.documentElement.classList.contains('dark');
	}
	// 在組件掛載時檢查當前主題
	import { onMount } from 'svelte';
	onMount(() => {
		initTheme();
		isDark = document.documentElement.classList.contains('dark');
	});
</script>

<!-- Appbar -->
<nav
	class="mb-4 bg-calico-secondary
        px-4 py-3 text-calico-black dark:bg-dark-secondary dark:text-dark-black"
>
	<div class="container mx-auto flex items-center justify-between">
		<!-- 左側logo -->
		<div class="flex items-center gap-2 text-xl font-semibold">
			<Ham size="24" />
			<span class="text-xl font-semibold">{title}</span>
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
