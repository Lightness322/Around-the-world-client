<script setup lang="ts">
defineProps<{
  isRouteCreation: boolean
}>()

defineEmits(['route-creation'])
</script>

<template>
  <header class="relative mb-4 flex justify-center gap-8 text-2xl font-semibold">
    <v-icon
      v-if="isRouteCreation"
      class="absolute left-5 cursor-pointer text-gray-500 hover:text-gray-400"
      name="bi-arrow-left-square-fill"
      scale="1.8"
      @click="$emit('route-creation', false)"
    ></v-icon>
    <span class="underline decoration-[#065036] decoration-[3px]">{{
      isRouteCreation ? 'New route' : 'Routes'
    }}</span>
    <v-icon
      v-if="!isRouteCreation"
      class="absolute right-5 cursor-pointer text-green-700 hover:text-green-600"
      name="bi-plus-square-fill"
      scale="1.8"
      @click="$emit('route-creation', true)"
    ></v-icon>
  </header>
</template>

<style></style>
