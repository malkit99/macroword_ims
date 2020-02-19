import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import middleware from '../middleware/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    meta:{
      middleware:[
        middleware.guest
      ]
    }
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue'),
    meta:{
      middleware:[
        middleware.guest
      ]
    }
  },

  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('../views/auth/ForgotPassword.vue'),
    meta:{
      middleware:[
        middleware.guest
      ]
    }
  },

  {
    path: '/reset-password',
    name: 'resetPassword',
    component: () => import('../views/auth/ResetPassword.vue'),
    meta:{
      middleware:[
        middleware.guest
      ]
    }
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta:{
      middleware:[
        middleware.auth
      ]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function nextCheck(context , middleware , index){
  const nextMiddleware = middleware[index];

  if(!nextMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);

    const nextMidd = nextCheck(context , middleware , index +1);

    nextMiddleware({...context , next: nextMidd});
  }
}

router.beforeEach((to , from , next) => {
    if(to.meta.middleware){
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

      const ctx = {
        from,
        next,
        router,
        to
      }

      const nextMiddleware = nextCheck(ctx , middleware , 1);
      return middleware[0]({...ctx , next: nextMiddleware}); 
    }

    return next();
});

export default router
