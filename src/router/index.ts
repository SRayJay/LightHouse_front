import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const MySpace = () => import("@V/MySpace.vue");
const Home = () => import("@V/Home.vue");
const Setting = () => import("@V/Setting.vue");
const Islands = () => import("@/views/Islands/Islands.vue");
const CreateIsland = () => import("@V/Islands/CreateIsland.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/login',
    name:"Login",
    component: () => import('@V/Login.vue')
  },
  {
    path: "/myspace",
    name: "MySpace",
    component: MySpace,
    children: [
      {
        path: "setting",
        name: "Setting",
        component: Setting,
      },
    ],
  },
  // {
  //   path: "/islands",
  //   name: "Islands",
  //   component: Islands,
  // },
  // {
  //   path: "/createisland",
  //   name: "CreateIsland",
  //   component: CreateIsland,
  // },
  {
    path:"/book/:id",
    name:'BookDetail',
    component:()=>import('@V/BookDetail.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
