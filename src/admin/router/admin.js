import middleware from '../middleware/index'
const routes =[
    {
        path:'/admin-dashboard',
        component: ()=> import('../views/AdminDashboard'),
        meta:{
            middleware:[
              middleware.auth
            ]
          },
        children:[
            {
                path:'',
                name:'dashboard-home',
                component: ()=> import('../views/dashboard/AdminDashboardHome'),
                meta:{
                    middleware:[
                      middleware.auth
                    ]
                },
            },
            {
                path:'/test',
                name:'admin-test',
                component: ()=> import('../views/test/AdminTest'),
                meta:{
                    middleware:[
                      middleware.auth
                    ]
                },
            },
        ]
    },
   
]
export default routes