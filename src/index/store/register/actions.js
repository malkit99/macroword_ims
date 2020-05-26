import axios from "axios";

export default{

    getUsers(ctx){
        return new Promise((resolve , reject ) => {
            axios.get('api/register')
            .then((response) => {
                
                if(response.status == 200){
                    const users = response.data.data         
                    ctx.commit('SET_USERS' , users );
                   
                }       
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    userDelete(ctx , item ){
        return new Promise((resolve , reject ) => {
            axios.delete(`api/register/${item.id}`)
            .then((response) => {   
                if(response.status == 200){
                    ctx.commit('DELETE_USER' , item )
                }
                resolve(response);
            })
            .catch((error) => {
                reject(response)
            })
        });
    },

    saveUser(ctx , data ){
        return new Promise((resolve , reject ) => {
            axios.post('api/register', data)
            .then((response) => {
                ctx.commit('ADD_User' , data);
                resolve(response);      
            })
            .catch((error) => {
               reject(error);
            });
        });
    },
    editUser(ctx , item){
        return new Promise((resolve , reject) =>{
            axios.put(`api/register/${item.id}`, item)
            .then((response) => {
                ctx.commit('UPDATE_USER' , item)
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        })
    },

    userById(ctx , id){
        return new Promise((resolve , reject) =>{
            axios.get(`api/register/${id}`)
            .then((response) => {
                const user =response.data.data
                ctx.commit('SET_USER_BY_ID' , user )
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        })
    },
   


};