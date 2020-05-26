import middleware from '../middleware/index'
const routes =[
    {
        path:'/student-dashboard',
        component: ()=> import('../views/StudentDashboard'),
        meta:{
            middleware:[
              middleware.auth
            ]
        },
        children:[
            {
                path:'',
                name:'student-dashboard',
                component: ()=> import('../views/student_dashboard/StudentDashboardHome'),
                meta:{
                    middleware:[
                      middleware.auth
                    ]
                },
            },
            {
                path:'/exam',
                name:'exam-test',
                component: ()=> import('../views/test/ExamTest'),
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