<script lang="ts">
  import MealSelector from './MealSelector.svelte';

  export let date: number;
  export let day: string;
  export let isToday: boolean = false;
</script>

<div
  class="block flex w-full flex-col items-center gap-1 rounded-md bg-calico-secondary
         p-2 md:table-cell md:w-auto dark:bg-dark-secondary"
>
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

  <MealSelector />
  <MealSelector />
</div>
