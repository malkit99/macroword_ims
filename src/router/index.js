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
        path: '/master-home',
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
        path: '/event-home',
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
          {
            path: 'create-job',
            name: 'create-job',
            component: () => import('../views/admin/opportunity/CreateJob.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'edit-job',
            name: 'edit-job',
            component: () => import('../views/admin/opportunity/EditJob.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },
      // opportunity router path end here 
      // authorization router path start here
      {
        path: '/authorization',
        component: () => import('../views/admin/authorization/Authorization.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'authorization-home',
            component: () => import('../views/admin/authorization/AuthorizationHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'create-authorization',
            name: 'create-authorization',
            component: () => import('../views/admin/authorization/CreateAuthorization.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'edit-authorization',
            name: 'edit-authorization',
            component: () => import('../views/admin/authorization/EditAuthorization.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },
      
      // authorization router path end here 

      // Service router path start here
      {
        path: '/service',
        component: () => import('../views/admin/service/Service.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'service-home',
            component: () => import('../views/admin/service/ServiceHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'create-service',
            name: 'create-service',
            component: () => import('../views/admin/service/CreateService.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'edit-service',
            name: 'edit-service',
            component: () => import('../views/admin/service/EditService.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },
      
      // Service router path end here 

      // Discount router path start here
            {
              path: '/discount',
              component: () => import('../views/admin/discount/Discount.vue'),
              meta:{
                middleware:[
                  middleware.auth
                ]
              },
              children:[
                {
                  path: '',
                  name: 'discount-home',
                  component: () => import('../views/admin/discount/DiscountHome.vue'),
                  meta:{
                    middleware:[
                      middleware.auth
                    ]
                  }
                },
                {
                  path: 'create-discount',
                  name: 'create-discount',
                  component: () => import('../views/admin/discount/CreateDiscount.vue'),
                  meta:{
                    middleware:[
                      middleware.auth
                    ]
                  }
                },
                {
                  path: 'edit-discount',
                  name: 'edit-discount',
                  component: () => import('../views/admin/discount/EditDiscount.vue'),
                  meta:{
                    middleware:[
                      middleware.auth
                    ]
                  }
                },
              ]
            },
            
     // Discount router path end here 

      // Slider router path start here
      {
        path: '/slider',
        component: () => import('../views/admin/slider/Slider.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'slider-home',
            component: () => import('../views/admin/slider/SliderHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'create-slider',
            name: 'create-slider',
            component: () => import('../views/admin/slider/CreateSlider.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'edit-slider',
            name: 'edit-slider',
            component: () => import('../views/admin/slider/EditSlider.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },
      
      // Slider router path end here 


      // Website router path start here
      {
        path: '/website',
        component: () => import('../views/admin/website/Website.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'website-home',
            component: () => import('../views/admin/website/WebsiteHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'create-website',
            name: 'create-website',
            component: () => import('../views/admin/website/CreateWebsite.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'edit-website',
            name: 'edit-website',
            component: () => import('../views/admin/website/EditWebsite.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },
      
      // Website router path end here 

      // country router path start here
      {
        path: '/country',
        component: () => import('../views/admin/country/Country.vue'),
        meta:{
          middleware:[
            middleware.auth
          ]
        },
        children:[
          {
            path: '',
            name: 'country-home',
            component: () => import('../views/admin/country/CountryHome.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'state-home',
            name: 'state-home',
            component: () => import('../views/admin/country/State.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
          {
            path: 'city-home',
            name: 'city-home',
            component: () => import('../views/admin/country/City.vue'),
            meta:{
              middleware:[
                middleware.auth
              ]
            }
          },
        ]
      },
      
      // country router path end here 
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
