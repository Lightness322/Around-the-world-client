import axios from '@/services/axios'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    _id: '',
    name: '',
    email: '',
    isLoading: false,
    error: ''
  })

  async function auth() {
    try {
      user.isLoading = true

      const res = await axios.get('/auth/me')
      user._id = res.data._id
      user.name = res.data.name
      user.email = res.data.email
      user.error = ''
    } catch (error: unknown | AxiosError) {
      console.log(error)
    } finally {
      user.isLoading = false
    }
  }

  async function login({ email, password }: { email: string; password: string }) {
    try {
      user.isLoading = true
      const res = await axios.post('/auth/login', { email, password })

      user._id = res.data._id
      user.name = res.data.name
      user.email = res.data.email
      user.error = ''

      window.localStorage.setItem('token', res.data.token)
    } catch (error: unknown | AxiosError) {
      if (error instanceof AxiosError && error.response) {
        user.error = error.response.data.message
      }
      console.log(error)
    } finally {
      user.isLoading = false
    }
  }

  async function register({
    name,
    email,
    password
  }: {
    name: string
    email: string
    password: string
  }) {
    try {
      user.isLoading = true

      const res = await axios.post('/auth/register', { name, email, password })

      user._id = res.data._id
      user.name = res.data.name
      user.email = res.data.email
      user.error = ''

      window.localStorage.setItem('token', res.data.token)
    } catch (error: unknown | AxiosError) {
      if (error instanceof AxiosError && error.response) {
        user.error = error.response.data.message
      }
      console.log(error)
    } finally {
      user.isLoading = false
    }
  }

  function logOut() {
    user.name = ''
    user.email = ''
    user._id = ''

    window.localStorage.removeItem('token')
  }

  return { user, login, register, logOut, auth }
})
