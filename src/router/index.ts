import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const Home = () => import("@V/Home.vue");
const Setting = () => import("@V/Setting.vue");
// const Islands = () => import("@/views/Islands/Islands.vue");
// const CreateIsland = () => import("@V/Islands/CreateIsland.vue");

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
    component: () =>import('@V/MySpace.vue'),
    children: [
      {
        path: "setting",
        name: "Setting",
        component: Setting,
      },
    ],
  },
  {
    path:'/search/:key',
    name:"SearchResult",
    component:()=>import('@V/SearchResult.vue'),
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
  },{
    path:'/author/:id',
    name:'AuthorDetail',
    component:()=>import('@V/AuthorDetail.vue')
  },{
    path:'/reviewedit',
    name:'ReviewEdit',
    component:()=>import('@V/Review/ReviewEditPage.vue'),
    meta:{
      requireAuth:true
    }
  },{
    path:'/review/:id',
    name:'ReviewContent',
    component:()=>import('@V/Review/ReviewContentPage.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
