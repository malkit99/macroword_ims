const routes =[
    {
        path:'/',
        redirect:'center-login'
    },
    {
        path:'center-login',
        name:'center-login',
        component: ()=> import('../views/CenterAuthLayout'),
    },
]
export default routes