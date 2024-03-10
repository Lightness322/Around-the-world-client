import type { IMap } from '@/models/mapModel'
import { useVisitedStore } from '@/store/visitedStore'
import type { Ref } from 'vue'

export function useWheel(map: IMap, currentMenuMarkerCoords: Ref<[number, number] | null>) {
  const visitedStore = useVisitedStore()

  function handleWheel(e: WheelEvent) {
    if (currentMenuMarkerCoords.value) {
      currentMenuMarkerCoords.value = null
    }
    if (map.scale >= 1 && e.deltaY < 0) {
      map.addMarkers(visitedStore.mapParams.markers.filter((city) => city.population >= 5_000_000))
    }
    if (map.scale >= 6 && e.deltaY < 0) {
      map.addMarkers(visitedStore.mapParams.markers.filter((city) => city.population >= 1_000_000))
    }
    if (map.scale >= 14 && e.deltaY < 0) {
      map.addMarkers([...visitedStore.mapParams.markers])
    }
    if (map.scale >= 1 && e.deltaY > 0) {
      map.removeMarkers()
      map.addMarkers(visitedStore.mapParams.markers.filter((city) => city.population >= 5_000_000))
    }
    if (map.scale >= 6 && e.deltaY > 0) {
      map.removeMarkers()
      map.addMarkers(visitedStore.mapParams.markers.filter((city) => city.population >= 1_000_000))
    }
    if (map.scale >= 14 && e.deltaY > 0) {
      map.removeMarkers()
      map.addMarkers([...visitedStore.mapParams.markers])
    }
  }

  return { handleWheel }
}
