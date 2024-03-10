<script setup lang="ts">
defineProps<{
  formType: 'login' | 'signup'
  isSubmitted: boolean
  isError: boolean
  isRequired: boolean
}>()

const model = defineModel()
</script>

<template>
  <label v-if="formType === 'signup'" class="relative flex flex-col">
    <input
      class="rounded-lg border-b-2 border-[#d3e7e0] p-2 pl-12 focus:border-green-300"
      :class="{
        'border-red-400': isError,
        'focus:border-red-500': isError
      }"
      v-model="model"
      placeholder="Enter your name"
    />
    <v-icon class="absolute left-2 top-[4px] text-gray-500" name="pr-user" scale="1.5"></v-icon>
    <div class="absolute right-2 top-full text-red-500" v-if="isSubmitted && isRequired">
      Field is required!
    </div>
  </label>
</template>

<style></style>
