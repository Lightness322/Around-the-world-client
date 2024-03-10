import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { defaultMapParams } from '@/data/data'
import type { ICity } from '@/models/mapModel'
import axios from '@/services/axios'

export const useVisitedStore = defineStore('map', () => {
  const mapParams = reactive({
    ...defaultMapParams,
    selectedRegions: [] as string[],
    markers: [] as ICity[]
  })

  const status = reactive({
    isCitiesLoading: false,
    isCityUpdating: false
  })

  async function getInitialCitiesAndRegions() {
    try {
      status.isCitiesLoading = true

      const res = await axios.get('/cities')

      mapParams.selectedRegions = []
      mapParams.markers = []

      const cities: ICity[] = res.data

      const allCountries = cities.map((marker) => marker.country)

      mapParams.selectedRegions = Array.from(new Set(allCountries))

      mapParams.markers = cities
    } catch (error) {
      console.log(error)
    } finally {
      status.isCitiesLoading = false
    }
  }

  async function deleteCity(cityId: string) {
    try {
      status.isCityUpdating = true

      await axios.delete(`/cities/${cityId}`)

      const deleteIndex = mapParams.markers.findIndex((markerCity) => {
        return markerCity._id === cityId
      })

      mapParams.markers.splice(deleteIndex, 1)
    } catch (error) {
      console.log(error)
    } finally {
      status.isCityUpdating = false
    }
  }

  async function addCity(city: ICity) {
    try {
      status.isCityUpdating = true

      const res = await axios.post('/cities', city)

      const { _id: cityId } = res.data

      city._id = cityId

      mapParams.markers.push(city)
    } catch (error) {
      console.log(error)
    } finally {
      status.isCityUpdating = false
    }
  }

  const sortedCities = computed(() => {
    return [...mapParams.markers].sort((a, b) => a.name.localeCompare(b.name))
  })

  const filteredCountries = computed(() => {
    const countries: string[] = [...mapParams.markers]
      .map((city) => city.country)
      .sort((a, b) => a.localeCompare(b))

    return Array.from(new Set(countries))
  })

  return {
    mapParams,
    sortedCities,
    filteredCountries,
    getInitialCitiesAndRegions,
    deleteCity,
    addCity,
    status
  }
})
