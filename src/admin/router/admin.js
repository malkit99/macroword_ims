const routes =[
    {
        path:'/admin-dashboard',
        name:'admin-dashboard',
        component: ()=> import('../views/AdminDashboard'),
    },
    {
        path:'/adminTest',
        name:'admin-test',
        component: ()=> import('../views/test/AdminTest'),
    },
]
export default routes