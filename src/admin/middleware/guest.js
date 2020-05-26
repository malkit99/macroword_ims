
export default function guest({next , router}){
    if(localStorage.getItem('admin_loggedin' , true)){
        return router.push({name:'dashboard-home'})
    }
    return next();
}