<script setup lang="ts">
import type { SelectedCity } from '@/models/searchCityModel'

defineProps<{ type: 'header' | 'routes'; city: SelectedCity }>()

defineEmits(['select-city', 'add-route-city'])
</script>

<template>
  <div
    class="flex items-center justify-between bg-white px-4 py-2"
    :class="{
      'cursor-pointer hover:bg-[#c8d9d3]': type === 'header'
    }"
    :key="city.latitude + city.longitude"
    @click="$emit('select-city', city)"
  >
    <span>{{ city.name }}</span>
    <span class="flex items-center gap-4">
      <CountryFlagIcon :country="city.country" />
      <button
        class="flex items-center text-green-700 hover:text-green-600"
        v-if="type === 'routes'"
        @click="$emit('add-route-city', city)"
      >
        <v-icon name="bi-plus-square-fill" scale="1.3"></v-icon>
      </button>
    </span>
  </div>
</template>

<style></style>
