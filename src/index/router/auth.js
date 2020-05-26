import AuthLayout from '../views/layouts/AuthLayout.vue'
import middleware from '../middleware/index'
const routes = [
 //  auth route here
      {
        path: '/authentication',
        component:AuthLayout,
        meta:{
          middleware:[
            middleware.guest
          ]
        },
        children:[
          {
            path: '',
            name:'authentication',
            component: () => import('../views/auth/MainLoginPage.vue'),
            meta:{
              middleware:[
                middleware.guest
              ]
            }
          },
          {
            path: '/signin',
            name:'signin',
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

export default routes 