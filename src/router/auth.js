import AuthLayout from '../views/layouts/AuthLayout.vue'
import middleware from '../middleware/index'
const routes = [
 //  auth route here
      {
        path: '/signin',
        component:AuthLayout,
        meta:{
          middleware:[
            middleware.guest
          ]
        },
        children:[
          {
            path: '',
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