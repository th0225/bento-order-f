<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
</script>

<div class="dark:bg-dark-bg min-h-screen bg-calico-bg">
	<AppBar title="Bento Order" />
	<Calendar />
</div>
