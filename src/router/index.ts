import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";


const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@V/Home.vue"),
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
  },
  {
    path:'/space/:id',
    name:'Space',
    component:()=>import('@V/Space.vue')
  },
  {
    path:"/setting",
    name:'Setting',
    component:() =>import('@V/Setting.vue')
  },
  {
    path:'/search/kw=:key',
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
  },{
    path:'/community',
    name:'Community',
    component:()=>import('@V/Community.vue')
  },{
    path:'/category',
    name:'Category',
    component:()=>import('@V/Category.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
