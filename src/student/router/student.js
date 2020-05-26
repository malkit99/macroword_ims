const routes =[
    {
        path:'/dashboard',
        name:'student-dashboard',
        component: ()=> import('../views/StudentDashboard'),
    },
    {
        path:'/exam',
        name:'exam-test',
        component: ()=> import('../views/test/ExamTest'),
    },
]
export default routes