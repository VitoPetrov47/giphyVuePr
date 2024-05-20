import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// @ts-ignore
import Dashboard from '../components/Dashboard.vue'
// @ts-ignore
import GifsPage from '../components/GifsPage.vue'
// @ts-ignore
import AuthorPage from '../components/AuthorPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/gifs/:id',
    name: 'GifsPage',
    component: GifsPage,
    props: route => ({ id: route.params.id, item: route.query.item }),
  },
  {
    path: '/author/:id',
    name: 'AuthorPage',
    component: AuthorPage,
    props: route => ({ id: route.params.id, item: route.query.item }),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
