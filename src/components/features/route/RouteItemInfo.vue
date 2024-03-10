<script setup lang="ts">
import type { IRoute } from '@/models/mapModel'
import { computed } from 'vue'

const props = defineProps<{ route: IRoute }>()

const totalCities = computed(() => {
  return props.route.markers.length
})

const totalCountries = computed(() => {
  return Array.from(new Set(props.route.markers.map((marker) => marker.country))).length
})
</script>

<template>
  <div class="flex justify-center gap-2">
    <span title="cities">
      <span>{{ totalCities }}</span>
      <v-icon class="text-teal-600" name="fa-map-marker-alt" scale="1.25"></v-icon
    ></span>
    <span class="flex gap-1" title="countries">
      <span>{{ totalCountries }}</span>
      <v-icon class="text-teal-600" name="fa-font-awesome-flag" scale="1.25"></v-icon
    ></span>
  </div>
</template>

<style></style>
