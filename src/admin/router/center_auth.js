import CenterAuthLayout from '../views/CenterAuthLayout'
import middleware from '../middleware/index'
const routes =[
    {
        path:'/',
        redirect:'center-login'
    },
    {
        path:'/center-login',
        component: CenterAuthLayout ,
        meta:{
            middleware:[
              middleware.guest
            ]
        },
        children:[
            {
                path:'',
                name:'center-login',
                component: ()=>import('../views/center_auth/CenterLogin'),
                meta:{
                    middleware:[
                      middleware.guest
                    ]
                },
            },
        ]
    },
]
export default routes