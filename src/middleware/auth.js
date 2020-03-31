export default function auth({next , router}){
    if(!localStorage.getItem('loggedin', true)){
        return router.push('login')
    }

    return next();
}