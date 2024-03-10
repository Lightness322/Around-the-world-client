<script setup lang="ts">
defineOptions({
  name: 'NavBarLink'
})

defineProps<{
  to: string
}>()
</script>

<template>
  <router-link active-class="bg-[#527853] rounded-lg" :to="to">
    <div class="flex cursor-pointer items-center rounded-lg p-1 hover:bg-[#527853]">
      <slot></slot>
    </div>
  </router-link>
</template>

<style></style>
