import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'Home',
      component: () => import('../views/THome.vue')
    },
    {
      path: '/m3downloader',
      name: 'TM3DownLoader',
      component: () => import('../views/TM3DownLoader.vue')
    }
  ]
})

export default router
