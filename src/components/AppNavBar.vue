<script setup lang="ts">
import { useUserStore } from '@/store/userStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { currentRoute } = router

const userStore = useUserStore()

const isMenuShow = ref(false)

async function handleLogOut() {
  await router.push('/')
  isMenuShow.value = false
  userStore.logOut()
}
</script>

<template>
  <div
    v-if="currentRoute.path !== '/'"
    @mouseover="isMenuShow = true"
    @mouseleave="isMenuShow = false"
    class="fixed bottom-0 top-0 z-10 flex w-[56px] items-center bg-[#065036] bg-opacity-95 text-white transition-all duration-200 ease-linear hover:w-[140px]"
  >
    <nav class="flex w-full flex-col gap-6 p-1">
      <NavBarLink to="/visited">
        <v-icon class="w-10 shrink-0" name="io-earth"></v-icon>
        <Transition name="show">
          <div class="pl-3" v-if="isMenuShow">MAP</div>
        </Transition>
      </NavBarLink>
      <NavBarLink to="/routes">
        <v-icon class="w-10 shrink-0" name="fa-suitcase-rolling"></v-icon>
        <Transition name="show">
          <div class="pl-3" v-if="isMenuShow">ROUTES</div>
        </Transition>
      </NavBarLink>
    </nav>
    <button @click="handleLogOut" class="absolute bottom-[25px] left-0 w-full p-1">
      <div class="flex w-full cursor-pointer items-center rounded-lg p-1 hover:bg-[#527853]">
        <v-icon class="w-10 shrink-0" name="md-logout-round"></v-icon>
        <Transition name="show">
          <div class="pl-3" v-if="isMenuShow">LOG&nbsp;OUT</div>
        </Transition>
      </div>
    </button>
  </div>
</template>

<style scoped>
.show-enter-active {
  transition: all 0.2s ease;
}

.show-leave-active {
  transition: all 0.2s ease;
}

.show-enter-from,
.show-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
