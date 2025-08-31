import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import Agendar from '../view/Agendar.vue'
import Extrato from '../view/Extrato.vue'
import Contas from '../view/Contas.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/agendar', name: 'Agendar', component: Agendar },
  { path: '/extrato', name: 'Extrato', component: Extrato },
  { path: '/contas', name: 'Contas', component: Contas }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
