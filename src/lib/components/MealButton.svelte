<script lang="ts">
  import { mealTypes } from '$lib/stores/meal';

  export let meal = 0;

  let state = 0;
  let isActive = false;

  function toggleColor() {
    state = (state + 1) % 3;

    isActive = true;
    setTimeout(() => (isActive = false), 150);
  }

  $: colorClass =
    state === 0
      ? 'bg-gray-400 hover:bg-gray-500'
      : state === 1
        ? 'bg-calico-orange dark:hover:bg-dark-hover bg-calico-orange hover:bg-calico-hover'
        : 'bg-green-500 hover:bg-green-600';
</script>

<button
  on:click={toggleColor}
  class={`transform rounded-lg px-4 py-2 font-semibold text-white transition-all duration-200
    ${colorClass} ${isActive ? 'scale-105' : 'scale-100'}`}
>
  {mealTypes[meal]}
  {#if state === 2}
    <span class="rounded-full bg-white/90 ml-2 px-2 py-0.5 text-xs font-bold text-emerald-600">
      x2
    </span>
  {/if}
</button>
