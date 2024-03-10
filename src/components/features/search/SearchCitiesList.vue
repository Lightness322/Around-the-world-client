<script setup lang="ts">
import type { SelectedCity } from '@/models/searchCityModel'

defineProps<{
  cities: SelectedCity[]
  type: 'header' | 'routes'
}>()
</script>

<template>
  <Transition name="show">
    <div
      v-if="cities.length > 0"
      class="z-10 grid gap-[1px] border-[#c7dfd7] bg-gray-200"
      :class="{
        'absolute left-[450px] top-full  grid w-[450px] auto-rows-auto grid-cols-2 rounded-br-xl border-b-4 border-r-4':
          type === 'header',
        'absolute top-[44px] w-full': type === 'routes'
      }"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
.show-enter-active {
  transition: all 0.2s ease;
}

.show-leave-active {
  transition: all 0.2s ease;
}

.show-enter-from,
.show-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
