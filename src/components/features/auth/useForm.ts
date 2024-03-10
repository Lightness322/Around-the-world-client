import useVuelidate from '@vuelidate/core'
import { reactive, ref } from 'vue'
import { minLength, required, email } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'

export function useForm(formType: 'login' | 'signup') {
  const formData = reactive({
    name: '',
    email: 'test@gmail.com',
    password: ''
  })

  const isSubmitted = ref(false)

  const validationRules = {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(5) }
  }

  const $v = useVuelidate(validationRules, formData)

  const userStore = useUserStore()

  const router = useRouter()

  async function handleSubmit() {
    isSubmitted.value = true
    $v.value.$touch()

    if (formType === 'login') {
      if ($v.value.email.$error || $v.value.password.$error) return null

      await userStore.login({ email: formData.email, password: formData.password })

      if (!userStore.user.isLoading && !userStore.user.error) {
        router.push('/visited')
      }
    }

    if (formType === 'signup') {
      if ($v.value.$invalid) return null

      await userStore.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      if (!userStore.user.isLoading && !userStore.user.error) {
        router.push('/visited')
      }
    }
  }

  return { formData, isSubmitted, $v, handleSubmit }
}
