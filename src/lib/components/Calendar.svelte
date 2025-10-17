<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';

	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	let currentYear = new Date().getFullYear();
	let currentMonth = new Date().getMonth();
	let currentDate = new Date().getDate();
	let currentDay = new Date().getDay();

	// 整個月的天數
	let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	function getDateWeekMapping() {
		let week = [];
		let month = [];
		for (let startDay = 1; startDay <= daysInMonth; startDay++) {
			const date = new Date(currentYear, currentMonth, startDay);
			const dayOfWeek = date.getDay();

			if (startDay === 1) {
				for (let i = 0; i < dayOfWeek; i++) {
					week.push(null);
				}
			}

			week.push({ date: startDay, day: days[dayOfWeek] });

			if (week.length === 7) {
				month.push(week);
				week = [];
			}
		}

		month.push(week);
		return month;
	}

	let dateWeekMapping = getDateWeekMapping();
</script>

<!-- 年月 -->
<div class="flex items-center justify-center gap-4 py-3">
	<button
		class="rounded-full px-3 py-1 text-calico-black transition hover:bg-calico-hover
					dark:text-dark-black dark:hover:bg-dark-hover"
	>
		<ArrowLeft />
	</button>

	<h1 class="text-2xl font-bold text-calico-orange dark:text-dark-orange">
		{currentYear}
		{months[currentMonth]}
	</h1>

	<button
		class="rounded-full px-3 py-1 text-calico-black transition hover:bg-calico-hover
					dark:text-dark-black dark:hover:bg-dark-hover"
	>
		<ArrowRight />
	</button>
</div>

<table class="w-full border-separate border-spacing-2 text-center">
	<thead>
		<tr
			class="bg-calico-secondary text-calico-text dark:bg-dark-secondary
						dark:text-dark-text"
		>
			{#each days as day}
				<th class="rounded-md px-2 py-1 font-semibold">{day}</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each dateWeekMapping as week}
			<tr>
				{#each week as item}
					{#if item === null}
						<td class="h-10"></td>
					{:else}
						<td
							class="h-10 w-10 cursor-pointer rounded-full text-center
									text-calico-text transition-all duration-200 hover:bg-calico-hover
									dark:text-dark-text dark:hover:bg-dark-hover
								{item.date === currentDate
								? ' bg-calico-active font-bold text-calico-text dark:text-dark-active '
								: ''}"
						>
							{item.date}
						</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
