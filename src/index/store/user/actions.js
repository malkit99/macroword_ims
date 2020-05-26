import axios from 'axios'
export default {   
    forgotPassword(ctx ,payload){
        return new Promise((resolve , reject)=>{
            axios.get('sanctum/csrf-cookie') 
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
            axios.get('sanctum/csrf-cookie')
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
    changePassword(ctx, payload){
        return new Promise ((resolve, reject ) => {
            axios.post('change-password', payload)
            .then((response) => {
                    resolve(response)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }
};