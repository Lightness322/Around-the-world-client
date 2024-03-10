<script setup lang="ts">
import { computed } from 'vue'
import type { IRoute } from '@/models/mapModel'

const props = defineProps<{ route: IRoute; cityPosition: 'first' | 'last' }>()

const country = computed(() => {
  const cities = props.route.markers

  if (props.cityPosition === 'first') {
    return cities.filter((marker) => marker.name === props.route.lines[0].from)[0].country
  } else {
    return cities.filter(
      (marker) => marker.name === props.route.lines[props.route.lines.length - 1].to
    )[0].country
  }
})
</script>

<template>
  <span class="flex items-center gap-2">
    <span>{{
      cityPosition === 'first' ? route.lines[0].from : route.lines[route.lines.length - 1].to
    }}</span>
    <CountryFlagIcon :country="country" />
  </span>
</template>

<style></style>
