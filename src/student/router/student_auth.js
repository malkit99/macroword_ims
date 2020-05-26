import StudentAuthLayout from '../views/StudentAuthLayout'
import middleware from '../middleware/index'
const routes =[
    {
        path:'/',
        redirect:'student-login'
    },
    {
        path:'/student-login',
        component: StudentAuthLayout ,
        meta:{
            middleware:[
              middleware.guest
            ]
        },
        children:[
            {
                path:'',
                name:'student-login',
                component: ()=>import('../views/student_auth/StudentLogin'),
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