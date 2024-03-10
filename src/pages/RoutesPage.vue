<script setup lang="ts">
import jsVectorMap from 'jsvectormap'

import { ref, onMounted, onUpdated, onUnmounted } from 'vue'
import type { Ref } from 'vue'

import type { IMap } from '@/models/mapModel'
import { defaultMapParams } from '@/data/data'
import { useRouteStore } from '@/store/routeStore'
import RouteItem from '@/components/features/route/RouteItem.vue'
import RouteListHeader from '@/components/features/route/RouteListHeader.vue'
import RouteCreation from '@/components/features/route/RouteCreation.vue'

let map: IMap = {} as IMap

const handleUpdate = () => map.updateSize()

const selectedRouteId: Ref<string | null> = ref(null)

const isRouteCreation = ref(false)

function selectRoute(id: string) {
  selectedRouteId.value = id
}

const routeStore = useRouteStore()

async function handleDeleteRoute(routeId: string) {
  await routeStore.deleteRoute(routeId)
  selectedRouteId.value = null
}

function handleRouteCreation(isCreation: boolean) {
  isRouteCreation.value = isCreation
  selectedRouteId.value = null
}

function handleCreateRoute(routeId: string) {
  isRouteCreation.value = false
  selectedRouteId.value = routeId
}

onMounted(() => {
  map = new jsVectorMap({
    ...defaultMapParams
  })

  window.addEventListener('resize', handleUpdate)
})

onUpdated(() => {
  if (!selectedRouteId.value) return null

  map = new jsVectorMap({
    ...defaultMapParams,
    markers: routeStore.routes.filter((route) => route._id === selectedRouteId.value)[0]?.markers,
    lines: routeStore.routes.filter((route) => route._id === selectedRouteId.value)[0]?.lines,
    selectedRegions: Array.from(
      new Set(
        routeStore.routes
          .filter((route) =>
            (route._id === selectedRouteId.value) !== null ? selectedRouteId.value : null
          )[0]
          .markers.map((marker) => marker.country)
      )
    )
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleUpdate)
})
</script>

<template>
  <div class="grid h-[calc(100%-72px)] grid-cols-[450px_1fr] bg-[#c7dfd7]">
    <div class="pl-[56px]">
      <div class="m-3 min-h-[50%] rounded-lg bg-white px-2 py-5">
        <RouteListHeader :isRouteCreation="isRouteCreation" @route-creation="handleRouteCreation" />
        <ul v-if="!isRouteCreation" class="flex flex-col gap-2">
          <RouteItem
            v-for="route in routeStore.routes"
            :key="route._id"
            :route="route"
            :selectedRouteId="selectedRouteId"
            @click="selectRoute(route._id!)"
            @select="(routeId) => selectRoute(routeId)"
            @delete="handleDeleteRoute"
          />
        </ul>
        <RouteCreation v-else :map="map" @create-route="handleCreateRoute" />
      </div>
    </div>
    <div class="h-full bg-[#DCF2F1] p-2">
      <div id="map" :key="String(selectedRouteId)" />
    </div>
  </div>
</template>

<style></style>
