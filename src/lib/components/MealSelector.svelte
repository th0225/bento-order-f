<script lang="ts">
  import { mealTypes } from '$lib/stores/meal';
</script>

<select
  class="mt-2 w-full rounded border border-gray-300 bg-calico-bg p-0.5
      text-sm text-calico-text dark:border-gray-600
      dark:bg-dark-bg dark:text-dark-text"
>
  <option value="">{mealTypes[0]}</option>
  <option value="">{mealTypes[1]}</option>
  <option value="">{mealTypes[2]}</option>
  <option value="">{mealTypes[3]}</option>
  <option value="">{mealTypes[4]}</option>
</select>
