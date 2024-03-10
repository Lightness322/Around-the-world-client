import { defineStore } from 'pinia'
import type { IRoute } from '@/models/mapModel'
import axios from '@/services/axios'
import { reactive } from 'vue'

export const useRouteStore = defineStore('route', () => {
  const routes: IRoute[] = reactive([])
  const status = reactive({
    isRoutesLoading: false,
    isRoutesUpdating: false
  })

  async function getInitialRoutes() {
    try {
      status.isRoutesLoading = true

      routes.splice(0)

      const res = await axios.get('/routes')

      routes.push(...res.data)
    } catch (error) {
      console.log(error)
    } finally {
      status.isRoutesLoading = false
    }
  }

  async function createRoute(route: IRoute) {
    try {
      status.isRoutesUpdating = true

      const res = await axios.post('/routes', route)

      routes.push(res.data)

      return res.data
    } catch (error) {
      console.log(error)
    } finally {
      status.isRoutesUpdating = false
    }
  }

  async function deleteRoute(routeId: string) {
    try {
      status.isRoutesUpdating = true

      await axios.delete(`/routes/${routeId}`)

      const index = routes.findIndex((route) => route._id === routeId)

      routes.splice(index, 1)
    } catch (error) {
      console.log(error)
    } finally {
      status.isRoutesUpdating = false
    }
  }

  return { routes, status, getInitialRoutes, createRoute, deleteRoute }
})
