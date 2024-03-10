import type { ICity, IMap, IRoute } from '@/models/mapModel'
import { useRouteStore } from '@/store/routeStore'
import { useSelectedRegionStore } from '@/store/selectedRegionStore'
import { reactive } from 'vue'

export function useRouteCreation(map: IMap, emit: (event: 'create-route', args: any[]) => void) {
  const selectedRegionStore = useSelectedRegionStore()

  const routeStore = useRouteStore()

  const newRoute: IRoute = reactive({ lines: [], markers: [] })

  function handleAddCity() {
    newRoute.markers.push(selectedRegionStore.selectedRegion as ICity)
    map.removeMarkers()
    map.addMarkers(newRoute.markers)
    map.clearSelectedRegions()
    map._setSelected(
      'regions',
      newRoute.markers.map((marker) => marker.country)
    )
    if (newRoute.markers.length > 1) {
      newRoute.lines.push({
        from: newRoute.markers[newRoute.markers.length - 2].name,
        to: newRoute.markers[newRoute.markers.length - 1].name
      })
      map.removeLines()
      map.addLines(newRoute.lines)
    }
  }

  function handleDrag() {
    const newLines = []
    for (let i = 1; i < newRoute.markers.length; i++) {
      newLines.push({
        from: newRoute.markers[i - 1].name,
        to: newRoute.markers[i].name
      })
    }
    newRoute.lines = newLines
    map.removeLines()
    map.addLines(newLines)
  }

  async function handleCreateRoute() {
    const { _id: routeId } = await routeStore.createRoute(newRoute)
    emit('create-route', routeId)
    newRoute.lines = []
    newRoute.markers = []
  }

  return { newRoute, handleAddCity, handleDrag, handleCreateRoute }
}
