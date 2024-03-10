<script setup lang="ts">
defineOptions({
  name: 'AppDialog'
})

defineProps<{ isShow: boolean }>()

defineEmits(['updateShow'])
</script>

<template>
  <Transition>
    <div
      v-if="isShow"
      class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
      @click="$emit('updateShow')"
    >
      <div class="rounded-xl bg-white p-10" @click.stop>
        <slot></slot>
      </div></div
  ></Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
