import { createRouter, createWebHashHistory } from 'vue-router'
import SavedProjects from '@/views/SavedProjects.vue'
import PatioCreator from '@/views/PatioCreator.vue'

const routes = [
  {
    path: '/projects',
    name: 'SavedProjects',
    component: SavedProjects
  },
  {
    path: '/patio-creator/:id',
    name: 'PatioCreator',
    component: PatioCreator,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    redirect: () => {
      return { path: '/projects'}
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
