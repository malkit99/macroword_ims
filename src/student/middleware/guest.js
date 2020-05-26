
export default function guest({next , router}){
    if(localStorage.getItem('student_loggedin' , true)){
        return router.push({name:'student-dashboard'})
    }
    return next();
}