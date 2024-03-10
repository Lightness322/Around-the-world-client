import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import { router } from '@/router/router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { icons } from '@/components/UI/icons'

import components from '@/components/UI/index'

addIcons(...icons)

const pinia = createPinia()

const app = createApp(App)

app.component('v-icon', OhVueIcon)

components.forEach((component) => app.component(component.name, component))

app.use(pinia).use(router)
app.mount('#app')
