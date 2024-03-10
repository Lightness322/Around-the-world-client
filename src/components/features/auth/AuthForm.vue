<script setup lang="ts">
import { watch, onUnmounted } from 'vue'

import { useUserStore } from '@/store/userStore'

import AuthNameField from '@/components/features/auth/AuthNameField.vue'
import AuthEmailField from '@/components/features/auth/AuthEmailField.vue'
import AuthPasswordField from '@/components/features/auth/AuthPasswordField.vue'
import { useForm } from './useForm'

const props = defineProps<{
  formType: 'login' | 'signup'
  isFormShow: boolean
}>()

const { formData, isSubmitted, $v, handleSubmit } = useForm(props.formType)

const userStore = useUserStore()

onUnmounted(() => {
  userStore.user.error = ''
})

watch(formData, () => {
  userStore.user.error = ''
})
</script>

<template>
  <div class="mb-5 text-center text-2xl font-semibold">
    {{ formType === 'login' ? 'Log in' : 'Sign up' }}
  </div>
  <form class="flex w-screen max-w-[500px] flex-col gap-5" @submit.prevent="handleSubmit">
    <AuthNameField
      v-model="formData.name"
      :form-type="formType"
      :is-submitted="isSubmitted"
      :is-error="$v.name.$error"
      :is-required="$v.name.required.$invalid"
    />
    <AuthEmailField
      v-model="formData.email"
      :is-submitted="isSubmitted"
      :is-error="$v.email.$error"
      :is-required="$v.email.required.$invalid"
      :is-valid-email="$v.email.email.$invalid"
    />
    <AuthPasswordField
      v-model="formData.password"
      :is-submitted="isSubmitted"
      :is-error="$v.password.$error"
      :is-required="$v.password.required.$invalid"
      :is-valid-password="$v.password.minLength.$invalid"
    />
    <AppButton class="mx-auto mt-5" :disabled="userStore.user.isLoading">
      <span v-if="!userStore.user.isLoading">
        {{ formType === 'login' ? 'Log in' : 'Sign up' }}
      </span>
      <AppSpinner v-else />
    </AppButton>
  </form>
</template>

<style></style>
