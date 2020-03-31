import axios from 'axios'
export default {
    
    loginUser(ctx , payload ){
        return new Promise( (resolve , reject ) => {
            axios.get('airlock/csrf-cookie')
                .then(response =>{
                axios.post('login' , payload )
                .then((response) => { 
                console.log(response.data);
                if(response.status==200 || response.statusText == "OK"){
                    ctx.commit('setLoggedIn' , true )
                    localStorage.setItem('loggedin',true);
                    resolve(response)
                }
                resolve(response)
                
                })
                .catch((error)=>{
                    console.log(error);
                    reject(error)
                })

            });
        })
    },



    loggedOut(ctx){
        return new Promise((resolve) => {
            axios.post('/logout')
            .then((response) => {
                console.log(response);
                localStorage.removeItem('loggedin', true);
                ctx.commit('SET_LOGGED_OUT', false )
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        })
    },

    setLoggedInState(ctx){
        return new Promise((resolve , reject) => {
            if(localStorage.getItem('loggedin', true)){
                ctx.commit('setLoggedIn' , true);
                resolve(true)

            }else{
                
                ctx.commit('setLoggedIn');
                resolve(false)

            }
        })
    },

    forgotPassword(ctx ,payload){
        return new Promise((resolve , reject)=>{
            axios.get('airlock/csrf-cookie') 
            .then((response)=>{
                axios.post('api/forgot-password' , payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error)
                })

            })
        })
    },

    resetNewPassword(ctx , payload ){
        return new Promise((resolve , reject)=>{
            axios.get('airlock/csrf-cookie')
            .then((response) => {
                axios.post('api/reset-password' , payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error)=>{
                    reject(error)
                })
            })
            })
    },

    me(ctx){
        return new Promise ((resolve, reject ) => {        
            axios.get('api/user')
            .then((response) => {
                console.log(response);
                if(response.status==200 || response.statusText == "OK"){  
                    ctx.commit('setUserDetails' , response.data.data );       
                }
                resolve(response) 
            })
            .catch((error)=>{
                console.log(error)
                reject(error)
            })
        })
    },

    changePassword(ctx, payload){
        return new Promise ((resolve, reject ) => {
            axios.post('change-password', payload)
            .then((response) => {
                console.log(response.data)
                if(response.data){

                    resolve(response)
                }
                else{
                reject(response)

                }
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }
};