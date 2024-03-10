<script setup lang="ts">
defineOptions({
  name: 'CountryFlagIcon'
})

const props = defineProps<{ country: string }>()
</script>

<template>
  <span
    class="h-max rounded-sm outline outline-1 outline-gray-300"
    :class="'fi ' + 'fi-' + props.country.toLowerCase()"
  ></span>
</template>

<style scoped></style>
