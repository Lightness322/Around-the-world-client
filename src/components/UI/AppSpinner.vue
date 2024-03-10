<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: 'white' | 'green'
    size?: 'small' | 'big'
  }>(),
  {
    color: 'white',
    size: 'small'
  }
)

defineOptions({
  name: 'AppSpinner'
})
</script>

<template>
  <span
    class="block rounded-full border-dashed"
    :class="{
      'h-6 w-6 animate-[spin_1.5s_linear_infinite] border-[3px]': size === 'small',
      'h-24 w-24 animate-[spin_2.5s_linear_infinite] border-[6px]': size === 'big',
      'border-white': color === 'white',
      'border-[#065036]': color === 'green'
    }"
  ></span>
</template>

<style></style>
