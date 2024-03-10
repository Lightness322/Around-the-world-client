<script setup lang="ts">
import { useUserStore } from '@/store/userStore'

defineProps<{
  isSubmitted: boolean
  isError: boolean
  isRequired: boolean
  isValidPassword: boolean
}>()

const userStore = useUserStore()

const model = defineModel()
</script>

<template>
  <label class="relative flex flex-col">
    <input
      class="rounded-lg border-b-2 border-[#d3e7e0] p-2 pl-12 focus:border-green-300"
      :class="{
        'border-red-400': isError,
        'focus:border-red-500': isError
      }"
      v-model="model"
      placeholder="Enter your password"
      type="password"
    />
    <v-icon class="absolute left-2 top-[4px] text-gray-500" name="pr-lock" scale="1.5"></v-icon>
    <div class="absolute right-2 top-full text-red-500" v-if="isSubmitted && isRequired">
      Field is required!
    </div>
    <div
      class="absolute left-0 top-[110%] w-full text-center text-red-500"
      v-if="userStore.user.error"
    >
      {{ userStore.user.error }}
    </div>
    <div class="absolute right-2 top-full text-red-500" v-else-if="isSubmitted && isValidPassword">
      At least 5 characters!
    </div>
  </label>
</template>

<style></style>
