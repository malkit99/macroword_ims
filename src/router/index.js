import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthLayout from '../views/layouts/AuthLayout.vue'
import AppLayout from '../views/layouts/AppLayout.vue'
import middleware from '../middleware/index'

Vue.use(VueRouter)

const routes = [
// dashboard route start here

  {
    path: '/',
    name: 'home',
    component: () => import('../views/admin/Home.vue'),
  },

  {
    path: '/',
    name: 'AppLayout',
    component: AppLayout,
    children:[
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/admin/Dashboard.vue'),
        meta:{
          middleware:[middleware.auth],
        }
      },


      {
        path: '/users',
        component: () => import('../views/admin/Users.vue'),
        meta:{
          middleware:[
            middleware.auth
          ],
        },
            children:[

              {
                path: '',
                name: 'users',
                component: () => import('../views/admin/user/UserHome.vue'),
                meta:{
                  middleware:[
                    middleware.auth
                  ]
                }
              },
              
              {
                path: 'create-user',
                name: 'create-user',
                component: () => import('../views/admin/user/CreateUser.vue'),
                meta:{
                  middleware:[
                    middleware.auth
                  ]
                }
              },

              {
                path: 'edit-user',
                name: 'edit-user',
                component: () => import('../views/admin/user/EditUser.vue'),
                meta:{
                  middleware:[
                    middleware.auth
                  ]
                }
              },

              {
                path: 'create-permission',
                name: 'create-permission',
                component: () => import('../views/admin/user/PermissionCreate.vue'),
                meta:{
                  middleware:[
                    middleware.auth
                  ]
                }
              },

              {
                path: 'create-user-role',
                name: 'create-user-role',
                component: () => import('../views/admin/user/RoleCreate.vue'),
                meta:{
                  middleware:[
                    middleware.auth
                  ]
                }
              },

              {
                path: 'show-user',
                name: 'show-user',
                component: () => import('../views/admin/user/ShowUser.vue'),
                meta:{
                  middleware:[
                    middleware.auth
                  ]
                }
              },      
            ]
      },


      {
        path: '/course',
        component: () => import('../views/admin/course/Course.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },

        children:[
          {
            path: '',
            name: 'course-home',
            component: () => import('../views/admin/course/CourseHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          {
            path: 'create-course',
            name: 'create-course',
            component: () => import('../views/admin/course/CreateCourse.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          {
            path: 'edit-course',
            name: 'edit-course',
            component: () => import('../views/admin/course/EditCourse.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          {
            path: 'show-course',
            name: 'show-course',
            component: () => import('../views/admin/course/ShowCourse.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          {
            path: 'category-home',
            name: 'category-home',
            component: () => import('../views/admin/course/Category.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'course-content',
            name: 'course-content',
            component: () => import('../views/admin/course/CourseContent.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          {
            path: 'create-content',
            name: 'create-content',
            component: () => import('../views/admin/course/CreateContent.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          {
            path: 'show-content',
            name: 'show-content',
            component: () => import('../views/admin/course/ShowContent.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          
          {
            path: 'edit-content',
            name: 'edit-content',
            component: () => import('../views/admin/course/EditContent.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },

      {
        path: 'master-home',
        name: 'master-home',
        component: () => import('../views/admin/master/MasterData.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        }
      },
      {
        path: 'testimonial-home',
        name: 'testimonial-home',
        component: () => import('../views/admin/testimonial/Testimonial.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        }
      },
      {
        path: 'event-home',
        component: () => import('../views/admin/event/Event.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'event-home',
            component: () => import('../views/admin/event/EventHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'create-event',
            name: 'create-event',
            component: () => import('../views/admin/event/CreateEvent.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },

      {
        path: '/team',
        component: () => import('../views/admin/team/Team.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },

        children:[
          {
            path: '',
            name: 'team-home',
            component: () => import('../views/admin/team/TeamHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          {
            path: 'create-team',
            name: 'create-team',
            component: () => import('../views/admin/team/CreateTeam.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },

          {
            path: 'edit-team',
            name: 'edit-team',
            component: () => import('../views/admin/team/EditTeam.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },

    

    ]
  },

  // dashboard route end here
  //  auth route here
  {
    path: '/',
    name: 'auth',
    component:AuthLayout,
            children:[
              {
                path: 'login',
                name: 'login',
                component: () => import('../views/auth/Login.vue'),
                meta:{
                  middleware:[
                    middleware.guest
                  ]
                }
              },
                      

                {
                  path: 'forgot-password',
                  name: 'forgot-password',
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
            ]
  },
// auth route end here
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
      const ctx = { from, next, router, to }
      const nextMiddleware = nextCheck(ctx , middleware , 1);
      return middleware[0]({...ctx , next: nextMiddleware}); 
    }

    return next();
});

export default router
