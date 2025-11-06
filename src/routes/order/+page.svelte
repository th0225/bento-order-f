<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowLeft, ArrowRight } from '@lucide/svelte';
  import MealSelector from '$lib/components/MealSelector.svelte';
  import DateCell from '$lib/components/DateCell.svelte';

  let months: string[] = [
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
  let days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let currentYear: number = new Date().getFullYear();
  let currentMonth: number = new Date().getMonth();
  let currentDate: number = new Date().getDate();

  let selectedYear: number = currentYear;
  let selectedMonth: number = currentMonth;
  let dateWeekMapping: ({ date: number; day: string } | null)[][] = [];

  // 整個月的天數
  let daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();

  function getDateWeekMapping(selectYear: number, selectMonth: number) {
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

<div class="mx-auto flex max-w-6xl justify-center">
  <div>
    <div class="mx-auto flex w-full max-w-md items-center justify-between mb-3">
      <button
        on:click={getPrevMonth}
        class="cursor-pointer rounded-full px-3 py-1 text-calico-black transition
              hover:bg-calico-hover dark:text-dark-black dark:hover:bg-dark-hover"
      >
        <ArrowLeft />
      </button>

      <h1
        class="text-2xl font-bold text-calico-orange
                hover:text-calico-hover dark:text-dark-orange dark:hover:text-dark-hover"
      >
        <button on:click={getToday} class="cursor-pointer">
          {selectedYear}
          {months[selectedMonth]}
        </button>
      </h1>

      <button
        on:click={getNextMonth}
        class="cursor-pointer rounded-full px-3 py-1 text-calico-black transition
              hover:bg-calico-hover dark:text-dark-black dark:hover:bg-dark-hover"
      >
        <ArrowRight />
      </button>
    </div>

    <!-- 桌機版 Table -->
    <table class="hidden md:table w-full table-fixed border-separate border-spacing-x-1
      border-spacing-y-1 text-center">
      <!-- 顯示星期 -->
      <thead>
        <tr class="bg-calico-secondary text-calico-text dark:bg-dark-secondary
          dark:text-dark-text">
          {#each days as day}
            <th class="rounded-md p-1 font-semibold">{day}</th>
          {/each}
        </tr>
      </thead>
      <!-- 顯示日期 -->
      <tbody>
        {#each dateWeekMapping as week}
          <tr>
            {#each week as item}
              {#if item === null}
                <td class="h-10"></td>
              {:else}
                <td>
                  <DateCell
                    date={item.date}
                    day={item.day}
                    isToday={item.date === currentDate &&
                            selectedMonth === currentMonth &&
                            selectedYear === currentYear}
                  />
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- 手機版卡片 -->
    <div class="md:hidden flex flex-col gap-2 w-full">
      {#each dateWeekMapping as week}
        {#each week as item}
          {#if item !== null}
            <DateCell
              date={item.date}
              day={item.day}
              isToday={item.date === currentDate &&
                      selectedMonth === currentMonth &&
                      selectedYear === currentYear}
            />
          {/if}
        {/each}
      {/each}
    </div>

  </div>
</div>
