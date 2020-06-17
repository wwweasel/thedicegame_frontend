import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import Home from '../views/Home.vue'

Vue.use(IonicVueRouter)

  const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/player/:playerId', 
    name: 'Home', 
    props: true, 
    component: () =>
    import(/* webpackChunkName: "new-item" */ '../components/Player.vue')
  }  
]

const router = new IonicVueRouter({
  routes: routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
