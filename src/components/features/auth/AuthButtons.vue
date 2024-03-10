<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useUserStore } from '@/store/userStore'

defineEmits(['update-modal'])

const userStore = useUserStore()

const router = useRouter()
</script>

<template>
  <div v-if="!userStore.user._id" class="flex gap-10">
    <AppButton
      class="p-3 text-xl font-semibold shadow-[2px_2px_5px_2px_black]"
      color="blue"
      @click="$emit('update-modal', true, 'signup')"
      >Sign up</AppButton
    >
    <AppButton
      class="p-3 text-xl font-semibold shadow-[2px_2px_5px_2px_black]"
      @click="$emit('update-modal', true, 'login')"
    >
      Log in
    </AppButton>
  </div>
  <div v-else>
    <AppButton
      @click="router.push('/visited')"
      class="p-3 text-xl font-semibold shadow-[2px_2px_5px_2px_black]"
      >Start tracking
    </AppButton>
  </div>
</template>

<style></style>
