export default function auth({next , router}){
    if(!localStorage.getItem('admin_loggedin', true)){
        return router.push('center-login')
    }

    return next();
}