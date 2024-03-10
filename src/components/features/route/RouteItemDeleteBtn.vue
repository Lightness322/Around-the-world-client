<script setup lang="ts">
import type { IRoute } from '@/models/mapModel'
import { useRouteStore } from '@/store/routeStore'
import { computed } from 'vue'

const routeStore = useRouteStore()

const props = defineProps<{
  route: IRoute
  isRouteItemHover: boolean
  selectedRouteId: string | null
}>()

const isBtnShow = computed(() => {
  return props.isRouteItemHover || props.selectedRouteId === props.route._id
})
</script>

<template>
  <button
    v-if="isBtnShow"
    class="absolute bottom-[5px] right-[10px] flex items-center justify-center text-red-600 hover:text-red-500"
  >
    <v-icon v-if="!routeStore.status.isRoutesUpdating" name="bi-x-square-fill" scale="1.2"></v-icon>
    <AppSpinner v-else class="h-5 w-5 border-[2px]" />
  </button>
</template>

<style></style>
