
import axios from '../../axios/index'
export default {
    loginUser(ctx , payload ){
        return new Promise( (resolve , reject ) => {
            axios.post('login' , payload )
            .then((response) => {
            if(response.data.access_token){
                localStorage.setItem('token',response.data.access_token);
                ctx.commit('setLoggedIn' , true )
                resolve(response)
            }else{
                reject(response)
            }
  
            })
            .catch((error)=>{
                reject(error)
            })
        })
    },

    registerUser(ctx , payload ){
        return new Promise( (resolve , reject ) => {
            axios.post('register' , payload )
            .then((response) => {
            if(response.data){
                resolve(response)
            }else{
                reject(response)
            }
  
            })
            .catch((error)=>{
                reject(error)
            })
        })
    },

    loggedOut(ctx){
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            ctx.commit('setLoggedIn' , false);
            resolve(true)
        })
    },

    setLoggedInState(ctx){
        return new Promise((resolve , reject) => {
            if(localStorage.getItem('token')){
                ctx.commit('setLoggedIn' , true);
                resolve(true)

            }else{
                
                ctx.commit('setLoggedIn' , false);
                resolve(false)

            }
        })
    },

    forgotPassword(ctx ,payload){
        return new Promise((resolve , reject)=>{
            axios.post('forgot-password' , payload)
            .then((response) => {
                resolve(response)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    },

    resetNewPassword(ctx , payload ){
        return new Promise((resolve , reject)=>{
            axios.post('reset-password' , payload)
            .then((response) => {
                resolve(response)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    },

    me(ctx){
        return new Promise ((resolve, reject ) => {
            axios.get('me')
            .then((response) => {
                ctx.commit('setUserDetails' , response.data );
                window.console.log(response.data);
                resolve(response)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }
};