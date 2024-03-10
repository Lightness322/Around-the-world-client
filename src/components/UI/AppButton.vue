<script setup lang="ts">
defineOptions({
  name: 'AppButton'
})

withDefaults(
  defineProps<{
    color?: 'blue' | 'green' | 'gray'
  }>(),
  { color: 'green' }
)
</script>

<template>
  <button
    class="flex min-w-[70px] items-center justify-center rounded-xl p-2 text-white"
    :class="{
      'bg-green-700 hover:bg-green-600': color === 'green',
      'bg-blue-700 hover:bg-blue-600': color === 'blue',
      'cursor-not-allowed bg-gray-500 hover:bg-gray-500': color === 'gray'
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped></style>
