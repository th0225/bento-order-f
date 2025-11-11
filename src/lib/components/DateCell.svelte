<script lang="ts">
  import { mealTypes } from '$lib/stores/meal';
  let { date, day, isToday, selectedMeal = $bindable([]) } = $props();
</script>

<div
  class="block flex w-full flex-col items-center gap-1 rounded-md bg-calico-secondary
         p-2 dark:bg-dark-secondary"
>
  <div class="flex w-full flex-row items-center justify-between">
    <div
      class="h-8 w-8 rounded-full text-center leading-8 text-calico-text dark:text-dark-text
        {isToday
        ? 'bg-calico-orange font-bold dark:text-dark-orange'
        : day === 'Sat' || day === 'Sun'
          ? 'text-red-500 dark:text-red-400'
          : ''}"
    >
      {date}
    </div>
    <div
      class="h-8 w-8 leading-8 md:hidden
      {day === 'Sat' || day === 'Sun'
        ? 'text-red-500 dark:text-red-400'
        : 'text-calico-text dark:text-dark-text'}"
    >
      {day}
    </div>
  </div>

  <select
    class="mt-2 w-full rounded border border-gray-300 bg-calico-bg p-0.5
      text-sm text-calico-text dark:border-gray-600
      dark:bg-dark-bg dark:text-dark-text"
    bind:value={selectedMeal[0]}
  >
    {#each mealTypes as meal}
      <option value={meal}>{meal}</option>
    {/each}
  </select>
  <select
    class="mt-2 w-full rounded border border-gray-300 bg-calico-bg p-0.5
      text-sm text-calico-text dark:border-gray-600
      dark:bg-dark-bg dark:text-dark-text"
    bind:value={selectedMeal[1]}
  >
    {#each mealTypes as meal}
      <option value={meal}>{meal}</option>
    {/each}
  </select>
</div>

<export {selectedMeal}></export>
