<script setup lang="ts">
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world-merc'
import 'jsvectormap/src/scss/jsvectormap.scss'
import { onMounted, onUnmounted, ref, type Ref, computed } from 'vue'
import { useSelectedRegionStore } from '@/store/selectedRegionStore'
import { storeToRefs } from 'pinia'
import { useVisitedStore } from '@/store/visitedStore'
import type { ICity, IMap } from '@/models/mapModel'
import { vMenu } from '@/components/features/visited/v-menu'
import { useWheel } from '@/components/features/visited/useWheel'

let map: IMap = {} as IMap

function handleCloseMenu() {
  if (currentMenuMarkerCoords.value) {
    currentMenuMarkerCoords.value = null
  }
}

const menuElem: Ref<HTMLDivElement | null> = ref(null)

const currentMenuMarkerCoords: Ref<[number, number] | null> = ref(null)
const currentMenuCity: Ref<ICity | null> = ref(null)

const handleUpdateSize = () => map.updateSize()

const selectedRegionStore = useSelectedRegionStore()

const { selectedRegion } = storeToRefs(selectedRegionStore)
const visitedStore = useVisitedStore()
const { mapParams } = storeToRefs(visitedStore)

selectedRegionStore.$subscribe(() => {
  if (typeof selectedRegion.value === 'string') {
    map.setFocus({
      region: selectedRegion.value,
      animate: true
    })
    map.addMarkers([...visitedStore.mapParams.markers])
  } else {
    const selectedCity = selectedRegion.value

    map.setFocus({
      region: selectedRegion.value.country,
      animate: true
    })
    map.removeMarkers()
    map.addMarkers(selectedCity)
  }
})

async function handleUpdateCity() {
  if (isCityVisited.value) {
    await visitedStore.deleteCity(currentMenuCity.value!._id!)

    if (
      !visitedStore.mapParams.markers
        .map((marker) => marker.country)
        .includes(currentMenuCity.value!.country)
    ) {
      map.clearSelectedRegions()
      map._setSelected(
        'regions',
        visitedStore.mapParams.markers.map((marker) => marker.country)
      )
    }
    map.removeMarkers()

    // trigger handleWheel to update cities due to scale
    const event = new WheelEvent('wheel', { deltaY: 1 })
    document.dispatchEvent(event)
  } else {
    await visitedStore.addCity(currentMenuCity.value!)

    map._setSelected('regions', [currentMenuCity.value!.country])
  }
  currentMenuMarkerCoords.value = null
}

onMounted(async () => {
  map = new jsVectorMap({
    onMarkerClick(e: MouseEvent, i: number) {
      e.stopPropagation()

      currentMenuCity.value = map._markers[i].config

      currentMenuMarkerCoords.value = [e.clientX, e.clientY]
    },
    ...mapParams.value
  })
  const { handleWheel } = useWheel(map, currentMenuMarkerCoords)

  map.removeMarkers()

  map.addMarkers(visitedStore.mapParams.markers.filter((city) => city.population >= 5_000_000))

  window.addEventListener('resize', handleUpdateSize)
  document.addEventListener('wheel', handleWheel)
  document.addEventListener('mousedown', handleCloseMenu)
})

onUnmounted(() => {
  const { handleWheel } = useWheel(map, currentMenuMarkerCoords)

  window.removeEventListener('resize', handleUpdateSize)
  document.removeEventListener('wheel', handleWheel)
  document.removeEventListener('mousedown', handleCloseMenu)
})

const isCityVisited = computed(
  () =>
    visitedStore.mapParams.markers.filter(
      (markerCity) =>
        markerCity.name === currentMenuCity.value?.name &&
        markerCity.population === currentMenuCity.value?.population
    ).length > 0
)
</script>

<template>
  <div
    @mousedown.stop
    v-menu="currentMenuMarkerCoords"
    v-if="currentMenuMarkerCoords"
    class="before: fixed z-20 block translate-y-[-92px] rounded-lg border-2 border-[#065036] bg-white p-3 before:absolute before:left-[calc(50%-10px)] before:top-full before:border-[10px] before:border-b-[10px] before:border-transparent before:border-t-[#065036] before:content-['']"
    ref="menuElem"
  >
    <div class="mb-2 text-center text-lg font-bold">{{ currentMenuCity?.name }}</div>
    <AppButton
      class="mx-auto"
      :disabled="visitedStore.status.isCityUpdating"
      :class="isCityVisited ? 'bg-red-700 hover:bg-red-500' : ''"
      @click="handleUpdateCity"
    >
      <span v-if="!visitedStore.status.isCityUpdating">{{
        isCityVisited ? 'Delete' : 'Visited!'
      }}</span>
      <AppSpinner v-else />
    </AppButton>
  </div>
  <div v-memo="[mapParams]" id="map" />
</template>

<style>
image.jvm-marker.jvm-element {
  object-fit: cover;
  width: 30px;
  height: 30px;
  transform: translate(-3.2344px, -17.0625px);
}
</style>
