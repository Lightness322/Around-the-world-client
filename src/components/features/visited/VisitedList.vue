<script setup lang="ts">
import { useSelectedRegionStore } from '@/store/selectedRegionStore'
import { useVisitedStore } from '@/store/visitedStore'
import { getCountryFullName } from '@/utils/getCountryFullname'
import type { Ref } from 'vue'
import { ref } from 'vue'

const visitedStore = useVisitedStore()
const selectedRegionStore = useSelectedRegionStore()

const showList: Ref<'cities' | 'countries'> = ref('cities')
</script>

<template>
  <div class="m-3 min-h-[50%] rounded-lg bg-white p-5">
    <div class="mb-4 flex justify-center gap-8 text-2xl font-semibold">
      <div
        class="cursor-pointer decoration-[#065036] decoration-[3px]"
        :class="showList === 'cities' ? 'underline' : ''"
        @click="showList = 'cities'"
      >
        Cities
      </div>
      <div
        class="cursor-pointer decoration-[#065036] decoration-[3px]"
        :class="showList === 'countries' ? 'underline' : ''"
        @click="showList = 'countries'"
      >
        Countries
      </div>
    </div>
    <ul v-if="showList === 'cities'">
      <li
        class="flex cursor-pointer items-center justify-between rounded-md px-[8px] py-[2px] hover:bg-[#c8d9d3]"
        v-for="city in visitedStore.sortedCities"
        :key="city.name + city.population"
        @click="selectedRegionStore.handleSelect(city)"
      >
        <span>{{ city.name }}</span>
        <CountryFlagIcon :country="city.country" />
      </li>
    </ul>
    <ul v-else>
      <li
        class="flex cursor-pointer items-center justify-between rounded-md px-[8px] py-[2px] hover:bg-[#c8d9d3]"
        v-for="country in visitedStore.filteredCountries"
        :key="country"
        @click="selectedRegionStore.handleSelect(country)"
      >
        <span>{{ getCountryFullName(country) }}</span>
        <CountryFlagIcon :country="country" />
      </li>
    </ul>
  </div>
</template>

<style></style>
