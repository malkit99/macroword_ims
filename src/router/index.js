import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthLayout from '../views/layouts/AuthLayout.vue'
import AppLayout from '../views/layouts/AppLayout.vue'
import FrontLayout from '../views/layouts/FrontLayout.vue'
import middleware from '../middleware/index'

Vue.use(VueRouter)

const routes = [

  
  {
    path: '',
    component: FrontLayout,
    meta:{
      middleware:[
        middleware.guest
      ]
    },
    children:[
      {
        path: '',
        name: 'home',
        component: () => import('../views/front/Home.vue'),
        meta:{
          middleware:[
            middleware.guest
          ]
        }
      },
      {
        path: 'about-home',
        name: 'about-home',
        component: () => import('../views/front/About.vue'),
        meta:{
          middleware:[
            middleware.guest
          ]
        }
      },
      {
        path: 'programme',
        name: 'programme',
        component: () => import('../views/front/Programme.vue'),
        meta:{
          middleware:[
            middleware.guest
          ]
        }
      },
      {
        path: 'course-detail',
        name: 'course-detail',
        component: () => import('../views/front/CourseDetail.vue'),
        meta:{
          middleware:[
            middleware.guest
          ]
        }
      },
      {
        path: 'contact-us',
        name: 'contact-us',
        component: () => import('../views/front/ContactUs.vue'),
        meta:{
          middleware:[
            middleware.guest
          ]
        }
      },
    ]
  },
// front page route link end here 

// dashboard route start here
  {
    path: '/dashboard',
    component: AppLayout,
    meta:{
      middleware:[middleware.auth],
    },
    children:[
      {
        path: '',
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
        path: '/testimonial',
        component: () => import('../views/admin/testimonial/Testimonial.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'testimonial-home',
            component: () => import('../views/admin/testimonial/TestimonialHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'create-testimonial',
            name: 'create-testimonial',
            component: () => import('../views/admin/testimonial/CreateTestimonial.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'edit-testimonial',
            name: 'edit-testimonial',
            component: () => import('../views/admin/testimonial/EditTestimonial.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
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

          {
            path: 'edit-event',
            name: 'edit-event',
            component: () => import('../views/admin/event/EditEvent.vue'),
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
      // clender router path start here 
      {
        path: '/clender',
        component: () => import('../views/admin/clender/Clender.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'clender-home',
            component: () => import('../views/admin/clender/ClenderHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },
      // clender router path end here  
      // opportunity router path start here
      {
        path: '/opportunity',
        component: () => import('../views/admin/opportunity/Job.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'job-home',
            component: () => import('../views/admin/opportunity/JobHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },
      // opportunity router path end here  
    ]
  },

  // dashboard route end here
  //  auth route here
          {
            path: '/login',
            component:AuthLayout,
            meta:{
              middleware:[
                middleware.guest
              ]
            },
            children:[
              {
                path: '',
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
