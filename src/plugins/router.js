import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
 
 
  {
    path: '/import-nse',
    name: 'App',
    component : () => import( '../pages/import-nse.vue')
  },
  {
    path: '',
    name: 'App',
    component : () => import( '../pages/import-nse.vue')
  },
  {
    path: '/import-data',
    name: 'App',
    component : () => import( '../pages/import-data.vue')
  },
  {
    path : '',
    redirect : '/app.vue'
  },
  {
    path : '*',
    redirect : '/app.vue'
  },
]

const router = new VueRouter({
  mode : 'history',
  routes
})


// router.beforeEach((to, _, next) => {
//   const currentUser = {...store.getters['USER/getCurrentUser']};
//   const isAuthenticated = currentUser.userId
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (isAuthenticated) {
//       return next();
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       });
//     }
//   } else {
//     next();
//   }
// })


export default router