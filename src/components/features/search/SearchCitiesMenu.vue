<script setup lang="ts">
import { useSearchCities } from './useSearchCities'
import SearchCityItem from './SearchCityItem.vue'
import SearchCitiesList from './SearchCitiesList.vue'

defineProps<{ type: 'header' | 'routes' }>()

const { inputValue, cities, handleInput, handleSelectCity } = useSearchCities()

defineEmits(['select-city', 'add-route-city'])
</script>

<template>
  <input
    class="rounded-lg bg-white p-2"
    :class="{
      'absolute left-[450px] min-w-[450px]': type === 'header',
      'w-full border-2 border-[#c7dfd7]': type === 'routes'
    }"
    @input="handleInput"
    v-model="inputValue"
    placeholder="search cities..."
  />
  <SearchCitiesList :cities="cities" :type="type">
    <SearchCityItem
      :type="type"
      v-for="city in cities"
      :city="city"
      :key="city.latitude + city.longitude"
      @add-route-city="
        (city) => {
          handleSelectCity(city)
          $emit('add-route-city')
        }
      "
      @select-city="(city) => handleSelectCity(city)"
    />
  </SearchCitiesList>
</template>

<style scoped></style>
