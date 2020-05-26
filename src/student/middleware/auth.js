export default function auth({next , router}){
    if(!localStorage.getItem('student_loggedin', true)){
        return router.push('/student-login')
    }

    return next();
}