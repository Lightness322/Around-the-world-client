<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import AppDialog from '@/components/UI/AppDialog.vue'
import AuthForm from '@/components/features/auth/AuthForm.vue'
import AuthButtons from '@/components/features/auth/AuthButtons.vue'

const isFormShow = ref(false)

const formType: Ref<'login' | 'signup'> = ref('login')

function handleUpdateModal(action: boolean, type: 'signup' | 'login' = 'signup') {
  formType.value = type
  isFormShow.value = action
}
</script>

<template>
  <AppDialog :isShow="isFormShow" @update-show="handleUpdateModal(false)">
    <AuthForm :is-form-show="isFormShow" :form-type="formType" />
  </AppDialog>
  <div class="flex h-full flex-col items-center justify-center gap-10 bg-[url('bg.jpg')] bg-cover">
    <div
      style="text-shadow: black 2px 5px"
      class="max-w-[820px] text-center text-5xl font-bold leading-[3.4rem] text-white drop-shadow-2xl"
    >
      Greetings traveler! Start tracking the cities you've traveled to and get inspired for your
      next adventure.
    </div>
    <AuthButtons @update-modal="(action, type) => handleUpdateModal(action, type)" />
  </div>
</template>

<style></style>
