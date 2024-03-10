import type { SelectedCity } from '@/models/searchCityModel'
import { useSelectedRegionStore } from '@/store/selectedRegionStore'
import { debounce } from '@/utils/debounce'
import axios from 'axios'
import { reactive, ref } from 'vue'

export function useSearchCities() {
  const inputValue = ref('')

  const cities: SelectedCity[] = reactive([])

  const selectedRegionStore = useSelectedRegionStore()

  async function searchCities() {
    if (inputValue.value.length < 3) {
      cities.splice(0)
      return
    }
    if (inputValue.value.length >= 3) {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/city?name=${inputValue.value}&limit=5`,
        {
          headers: { 'X-Api-Key': 'fMOkL/g+ak2kLOFeEMaeuw==xbWElmDJCn3hFhN8' }
        }
      )
      const searchedCities: SelectedCity[] = await res.data

      if (cities.length > 0) {
        cities.splice(0)
      }
      cities.push(...searchedCities)
      console.log(cities)
    }
  }

  function handleSelectCity(city: SelectedCity) {
    selectedRegionStore.handleSelect({
      name: city.name,
      coords: [city.latitude, city.longitude],
      country: city.country,
      is_capital: city.is_capital,
      population: city.population
    })

    inputValue.value = ''
    cities.splice(0)
  }

  const handleInput = debounce(searchCities, 400)

  return { inputValue, cities, handleInput, handleSelectCity }
}
