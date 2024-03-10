<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/userStore'
import { useRouteStore } from './store/routeStore'
import { useVisitedStore } from './store/visitedStore'
import AppSpinner from './components/UI/AppSpinner.vue'
import AppNavBar from './components/AppNavBar.vue'

const userStore = useUserStore()

const router = useRouter()
const { currentRoute } = router

const routeStore = useRouteStore()
const visitedStore = useVisitedStore()

userStore.$subscribe(async () => {
  if (userStore.user._id && !userStore.user.isLoading && !userStore.user.error) {
    await routeStore.getInitialRoutes()
    await visitedStore.getInitialCitiesAndRegions()
  }
})
</script>

<template>
  <div class="relative h-screen bg-[#eaf3f0]">
    <AppNavBar />
    <AppHeader />
    <div
      class="flex h-[calc(100%-72px)] items-center justify-center pl-[56px]"
      v-if="
        currentRoute.path !== '/' &&
        (visitedStore.status.isCitiesLoading || routeStore.status.isRoutesLoading)
      "
    >
      <AppSpinner size="big" color="green" />
    </div>

    <router-view v-else></router-view>
  </div>
</template>

<style></style>
