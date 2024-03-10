import VisitedPage from '@/pages/VisitedPage.vue'
import RoutesPage from '@/pages/RoutesPage.vue'
import MainPage from '@/pages/MainPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/userStore'

const routes = [
  { path: '/', component: MainPage },
  { path: '/visited', component: VisitedPage },
  { path: '/routes', component: RoutesPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()

  if (!userStore.user._id) {
    await userStore.auth()
  }

  const authRequired = to.path !== '/'

  if (authRequired && !userStore.user._id) {
    return '/'
  }
})
