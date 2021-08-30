import { createRouter,createWebHashHistory,createWebHistory } from "vue-router";

const MySpace = () => import('@V/MySpace.vue')
const Home = () => import('@V/Home.vue')
const Setting = () => import('@V/Setting.vue')

const routes = [
  {
    path:'/',
    name:'Home',
    component: Home
  },
  {
    path:'/myspace',
    name:'MySpace',
    component: MySpace,
    children:[
      {
        path: '/myspace/setting',
        name:'Setting',
        component: Setting
      }
    ]
  },
  
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router
