<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowLeft, ArrowRight } from '@lucide/svelte';
  import DateCell from '$lib/components/DateCell.svelte';
  import { apiFetch } from '$lib/api';
  import type { Meal } from '$lib/stores/meal';

  // 月份與星期陣列
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

  // 目前日期
  let currentYear: number = new Date().getFullYear();
  let currentMonth: number = new Date().getMonth();
  let currentDate: number = new Date().getDate();

  // 選擇的年份、月份與日期週映射
  let selectedYear: number = $state(currentYear);
  let selectedMonth: number = $state(currentMonth);

  // 日期與星期的對應關係陣列
  let dateWeekMapping: ({ date: string; day: string } | null)[][] = $state([]);

  // 整個月的天數
  let daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 整個月選擇的餐點資料
  let selectedMeal = $state<Record<string, string[]>>({});

  // 取得日期與星期的對應關係
  function getDateWeekMapping(selectYear: number, selectMonth: number) {
    let week = [];
    let month = [];

    for (let startDay = 1; startDay <= daysInMonth; startDay++) {
      const date = new Date(selectYear, selectMonth, startDay);
      const dayOfWeek = date.getDay();

      const key = `${selectYear}-${selectMonth}-${String(startDay).padStart(2, '0')}`;
      selectedMeal[key] ??= ['---', '---'];

      if (startDay === 1) {
        for (let i = 0; i < dayOfWeek; i++) {
          week.push(null);
        }
      }

      week.push({ date: String(startDay).padStart(2, '0'), day: days[dayOfWeek] });

      if (week.length === 7) {
        month.push(week);
        week = [];
      }
    }

    month.push(week);
    // console.log(month);
    return month;
  }

  // 取得今天的日期
  function getToday() {
    selectedYear = currentYear;
    selectedMonth = currentMonth;

    dateWeekMapping = getDateWeekMapping(selectedYear, selectedMonth);
  }

  // 取得下一個月份
  function getNextMonth() {
    selectedMonth += 1;

    if (selectedMonth > 11) {
      selectedMonth = 0;
      selectedYear += 1;
    }

    dateWeekMapping = getDateWeekMapping(selectedYear, selectedMonth);
  }

  // 取得上一個月份
  function getPrevMonth() {
    selectedMonth -= 1;

    if (selectedMonth < 0) {
      selectedMonth = 11;
      selectedYear -= 1;
    }

    dateWeekMapping = getDateWeekMapping(selectedYear, selectedMonth);
  }

  // 取得訂單
  async function getOrder(year: number, month: number) {
    return await apiFetch(`/meal/get/${year}/${month}`, {
      method: 'GET'
    });
  }

  // 儲存訂單
  async function saveOrder() {
    let monthMeals: Meal[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const key = toDateKey(selectedYear, selectedMonth, i).split('T')[0];

      let meal: Meal = {
          orderDate: key,
          mealType1: selectedMeal[key][0],
          mealType2: selectedMeal[key][1]
        };

      monthMeals.push(meal);
    }

    console.log('Saving Meals:', monthMeals);

    return await apiFetch(`/meal/batchUpdate`, {
      method: 'POST',
      body: JSON.stringify(monthMeals)
    });
  }

  function toDateKey(year: number, month: number, day: number | string) {
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}T00:00:00`;
  }

  // 初始化
  onMount(async () => {
    selectedYear = currentYear;
    selectedMonth = currentMonth;

    dateWeekMapping = getDateWeekMapping(selectedYear, selectedMonth);

    const meal = await getOrder(selectedYear, selectedMonth);
    console.log('Fetched Meal:', meal);
    for (const m of meal) {
      let dateKey = m.orderDate.split('T')[0];

      selectedMeal[dateKey][0] = m.mealType1;
      selectedMeal[dateKey][1] = m.mealType2;
    }
  });
</script>

<div class="mx-auto flex max-w-6xl justify-center">
  <div>
    <div class="mx-auto mb-3 flex w-full max-w-md items-center justify-between">
      <button
        onclick={getPrevMonth}
        class="cursor-pointer rounded-full px-3 py-1 text-calico-black transition
              hover:bg-calico-hover dark:text-dark-black dark:hover:bg-dark-hover"
      >
        <ArrowLeft />
      </button>

      <h1
        class="text-2xl font-bold text-calico-orange
                hover:text-calico-hover dark:text-dark-orange dark:hover:text-dark-hover"
      >
        <button onclick={getToday} class="cursor-pointer">
          {selectedYear}
          {months[selectedMonth]}
        </button>
      </h1>

      <button
        onclick={getNextMonth}
        class="cursor-pointer rounded-full px-3 py-1 text-calico-black transition
              hover:bg-calico-hover dark:text-dark-black dark:hover:bg-dark-hover"
      >
        <ArrowRight />
      </button>

      <button
        onclick={saveOrder}
        class="dark:bg-orange-orange cursor-pointer rounded-lg bg-calico-orange px-4 py-1
              font-medium text-calico-text transition-colors hover:bg-calico-hover
              dark:hover:bg-dark-hover"
      >
        儲存
      </button>
    </div>

    <!-- 桌機版 Table -->
    <table
      class="hidden w-full table-fixed border-separate border-spacing-x-2 border-spacing-y-1
      text-center md:table"
    >
      <!-- 顯示星期 -->
      <thead>
        <tr
          class="bg-calico-secondary text-calico-text dark:bg-dark-secondary
          dark:text-dark-text"
        >
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
                    isToday={item.date === String(currentDate).padStart(2, '0') &&
                      selectedMonth === currentMonth &&
                      selectedYear === currentYear}
                    bind:selectedMeal={
                      selectedMeal[`${selectedYear}-${selectedMonth}-${item.date}`]
                    }
                  />
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- 手機版卡片 -->
    <div class="flex w-full flex-col gap-2 md:hidden">
      {#each dateWeekMapping as week}
        {#each week as item}
          {#if item !== null}
            <DateCell
              date={item.date}
              day={item.day}
              isToday={item.date === String(currentDate).padStart(2, '0') &&
                selectedMonth === currentMonth &&
                selectedYear === currentYear}
              bind:selectedMeal={
                selectedMeal[`${selectedYear}-${selectedMonth}-${item.date}`]
              }
            />
          {/if}
        {/each}
      {/each}
    </div>
  </div>
</div>
