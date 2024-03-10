<script setup lang="ts">
defineProps<{
  isSubmitted: boolean
  isError: boolean
  isRequired: boolean
  isValidEmail: boolean
}>()

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
      placeholder="Enter your email"
    />
    <v-icon class="absolute left-2 top-[4px] text-gray-500" name="pr-envelope" scale="1.5"></v-icon>
    <div class="absolute right-2 top-full text-red-500" v-if="isSubmitted && isRequired">
      Field is required!
    </div>
    <div class="absolute right-2 top-full text-red-500" v-else-if="isSubmitted && isValidEmail">
      Please enter correct email!
    </div>
  </label>
</template>

<style></style>
