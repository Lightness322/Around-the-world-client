<script setup lang="ts">
import '/node_modules/flag-icons/css/flag-icons.min.css'
import SearchCitiesMenu from '@/components/features/search/SearchCitiesMenu.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'

const { currentRoute } = useRouter()

const userStore = useUserStore()
</script>

<template>
  <header
    v-if="currentRoute.path !== '/'"
    class="relative flex h-[72px] items-center justify-between bg-[#d3e7e0] py-3 pl-[88px] pr-[32px] shadow-md"
  >
    <router-link to="/">
      <img class="ml-[calc(165px-28px)] block h-10 scale-[1.5]" src="@/assets/logo3.png" />
    </router-link>
    <SearchCitiesMenu v-if="currentRoute.path === '/visited'" type="header" />
    <div>
      <div class="mr-20 font-semibold">
        <span>Welcome back, </span>
        <span class="underline">{{ userStore.user.name }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
