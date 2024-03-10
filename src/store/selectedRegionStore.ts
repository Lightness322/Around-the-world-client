import type { ICity } from '@/models/mapModel'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useSelectedRegionStore = defineStore('selectedRegion', () => {
  const selectedRegion: Ref<ICity | string> = ref({} as ICity)

  function handleSelect(city: ICity | string) {
    selectedRegion.value = ''

    selectedRegion.value = city
  }

  return { selectedRegion, handleSelect }
})
