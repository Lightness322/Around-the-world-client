<script setup lang="ts">
import type { IRoute } from '@/models/mapModel'
import { ref } from 'vue'
import RouteItemCity from '@/components/features/route/RouteItemCity.vue'
import RouteItemInfo from '@/components/features/route/RouteItemInfo.vue'
import RouteItemDeleteBtn from '@/components/features/route/RouteItemDeleteBtn.vue'

defineProps<{ route: IRoute; selectedRouteId: string | null }>()

defineEmits(['select', 'delete'])

const isRouteItemHover = ref(false)
</script>

<template>
  <li
    @mouseenter="isRouteItemHover = true"
    @mouseleave="isRouteItemHover = false"
    class="relative cursor-pointer rounded-md px-[8px] py-[2px] text-lg hover:bg-[#c8d9d3]"
    :class="route._id === selectedRouteId ? 'bg-[#c8d9d3]' : ''"
    @click="$emit('select', route._id!)"
  >
    <RouteItemDeleteBtn
      @click.stop="$emit('delete', route._id!)"
      :route="route"
      :selectedRouteId="selectedRouteId"
      :isRouteItemHover="isRouteItemHover"
    />
    <div class="flex justify-center gap-2">
      <RouteItemCity :route="route" :cityPosition="'first'" />
      <v-icon class="text-teal-600" name="md-arrowcircleright-outlined" scale="1.5"></v-icon>
      <RouteItemCity :route="route" :cityPosition="'last'" />
    </div>
    <RouteItemInfo :route="route" />
  </li>
</template>

<style></style>
