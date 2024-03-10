<script setup lang="ts">
import type { IMap } from '@/models/mapModel'
import { useRouteStore } from '@/store/routeStore'
import { onUnmounted } from 'vue'
import SearchCitiesMenu from '@/components/features/search/SearchCitiesMenu.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useRouteCreation } from './useRouteCreation'

const props = defineProps<{
  map: IMap
}>()

const emit = defineEmits(['create-route'])

const { newRoute, handleAddCity, handleDrag, handleCreateRoute } = useRouteCreation(props.map, emit)

const routeStore = useRouteStore()

onUnmounted(() => {
  newRoute.markers = []
  newRoute.lines = []
})
</script>

<template>
  <div class="relative flex flex-col items-center gap-2">
    <SearchCitiesMenu type="routes" @add-route-city="handleAddCity" />
    <VueDraggableNext v-model="newRoute.markers" :animation="300" @change="handleDrag">
      <div
        class="flex cursor-move flex-col items-center accent-black"
        v-for="(city, index) in newRoute.markers"
        :key="city._id"
      >
        <li class="flex items-center gap-2">
          <span class="text-xl font-semibold">{{ city.name }}</span>
          <CountryFlagIcon :country="city.country" />
        </li>
        <v-icon
          v-if="newRoute.markers.length - 1 !== index"
          class="text-green-800"
          name="co-arrow-thick-bottom"
          scale="1.25"
        ></v-icon>
      </div>
    </VueDraggableNext>
    <AppButton
      class="mt-4"
      :disabled="newRoute.markers.length < 2 || routeStore.status.isRoutesUpdating"
      :color="newRoute.markers.length < 2 ? 'gray' : 'green'"
      @click="handleCreateRoute"
    >
      <span v-if="!routeStore.status.isRoutesUpdating">Save route</span>
      <AppSpinner v-else />
    </AppButton>
  </div>
</template>

<style></style>
