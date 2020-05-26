
export default function guest({next , router}){
    if(localStorage.getItem('loggedin' , true)){
        return router.push({name:'dashboard'})
    }
    return next();
}