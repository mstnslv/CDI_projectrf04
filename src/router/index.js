import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import CatalogPageView from '../views/CatalogPageView.vue'
import CatalogPageViewDeleted from '../views/CatalogPageViewDeleted.vue'

import {storeToRefs} from "pinia";
import {useCatalogueStore} from "../store/catalogueStore.js";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CatalogView
    },
    {
      path: '/catalog',
      name: 'catalog',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/CatalogView.vue')
      component: CatalogView
    },
    {
      path: '/car/:id/',
      name: 'car',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CatalogPageView
    },
    {
      path: '/catalogpage_deleted',
      name: 'catalogpage_deleted',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CatalogPageViewDeleted
    },

    {
        path: '/avtodiller-v-gruzii',
        redirect: '/'
    },
    {
        path: '/page13',
        redirect: '/'
    },
    {
        path: '/question',
        redirect: '/'
    },
    {
        path: '/new-car',
        redirect: '/'
    },
      {
          path: '/:manufacturerSlug?/:modelSlug?/:fuelSlug?',
          name: 'catalog-filter',
          component: CatalogView,
          props: true
      },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/404.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
      if((to.name === 'catalog'||to.name === 'home') && (from.name === 'catalog'|| from.name === 'home')){
          return false;
      }
    function checkAllObjectFieldsIsSame(query, query2) {
      if(Object.keys(query).length !== Object.keys(query2).length){
            return false;
      }
      for (const key in query) {
          if(query[key] !== query2[key]){
              return false;
          }
      }
      return true;
    }

    function checkAllFieldsIsEmpty(query, query2) {
      for (const key in query) {
          if(key!== 'order' && query[key]){
              return false;
          }
      }
      for (const key in query2) {
          if(key!== 'order' && query2[key]){
              return false;
          }
      }
      return true;
    }

    if(from.name === 'catalog' && to.name === 'catalog'){
      if(checkAllObjectFieldsIsSame(to.query,from.query) || checkAllFieldsIsEmpty(to.query,from.query)){
        return false;
      }
    }

     if(from.name=== 'car' && to.name === 'catalog'){
       const refCatalogueStore = storeToRefs(useCatalogueStore());
       //console.log('scrollBehavior',from,to,savedPosition);
       if(refCatalogueStore.carsData && refCatalogueStore.carsData.value.length !== 0){
         return savedPosition;
       } else {
         return { top: 0 };
       }
     }


    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
    if (typeof window !== 'undefined' && document.body.style.overflow !== 'auto') {
        document.body.style.overflow = 'auto'
    }
    next()
})

export default router
