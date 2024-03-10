<script setup lang="ts">
import VisitedMap from '@/components/features/visited/VisitedMap.vue'
import VisitedList from '@/components/features/visited/VisitedList.vue'
</script>

<template>
  <div class="grid h-[calc(100%-72px)] grid-cols-[450px_1fr] bg-[#c7dfd7]">
    <div class="pl-[56px]">
      <VisitedList />
    </div>
    <div>
      <div class="h-full bg-[#DCF2F1] p-2">
        <VisitedMap />
      </div>
    </div>
  </div>
</template>

<style></style>
