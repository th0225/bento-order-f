<script lang="ts">
	import { onMount } from 'svelte';
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

	let selectedYear: number;
	let selectedMonth: number;
	let dateWeekMapping: any = [];

	// 整個月的天數
	let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	function getDateWeekMapping(selectYear: any, selectMonth: any) {
		let week = [];
		let month = [];
		for (let startDay = 1; startDay <= daysInMonth; startDay++) {
			const date = new Date(selectYear, selectMonth, startDay);
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
		// console.log(month);
		return month;
	}

	function getToday() {
		selectedYear = currentYear;
		selectedMonth = currentMonth;

		dateWeekMapping = getDateWeekMapping(selectedYear, selectedMonth);
	}

	function getNextMonth() {
		selectedMonth += 1;

		if (selectedMonth > 11) {
			selectedMonth = 0;
			selectedYear += 1;
		}

		dateWeekMapping = getDateWeekMapping(selectedYear, selectedMonth);
	}

	function getPrevMonth() {
		selectedMonth -= 1;

		if (selectedMonth < 0) {
			selectedMonth = 11;
			selectedYear -= 1;
		}

		dateWeekMapping = getDateWeekMapping(selectedYear, selectedMonth);
	}

	onMount(() => {
		selectedYear = currentYear;
		selectedMonth = currentMonth;

		dateWeekMapping = getDateWeekMapping(selectedYear, selectedMonth);
	});
</script>

<!-- 年月 -->
<div class="flex items-center justify-center gap-4 py-3">
	<button
		on:click={getPrevMonth}
		class="rounded-full px-3 py-1 text-calico-black transition hover:bg-calico-hover
					dark:text-dark-black dark:hover:bg-dark-hover"
	>
		<ArrowLeft />
	</button>

	<h1 class="text-2xl font-bold text-calico-orange dark:text-dark-orange
						hover:text-calico-hover dark:hover:text-dark-hover ">
		<button on:click={getToday}>
			{selectedYear}
			{months[selectedMonth]}
		</button>
	</h1>

	<button
		on:click={getNextMonth}
		class="rounded-full px-3 py-1 text-calico-black transition hover:bg-calico-hover
					dark:text-dark-black dark:hover:bg-dark-hover"
	>
		<ArrowRight />
	</button>
</div>

<table class="w-full table-fixed border-separate border-spacing-2 text-center">
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
								${item.date === currentDate && selectedMonth === currentMonth && selectedYear === currentYear
								? ' bg-calico-orange font-bold text-calico-text dark:text-dark-orange '
								: item.day === 'Sat' || item.day === 'Sun'
									? ' bg-calico-soft hover:bg-calico-soft dark:bg-dark-soft dark:hover:bg-dark-soft'
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
