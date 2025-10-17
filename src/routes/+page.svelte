<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
</script>

<div class="min-h-screen bg-calico-bg dark:bg-dark-bg">
	<AppBar title="Bento Order" />

	<div class="mx-auto max-w-4xl">
		<Calendar />
	</div>
</div>
