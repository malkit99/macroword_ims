import axios from "axios";

export default{

    saveRole(ctx , editedItem ){
        return new Promise((resolve , reject ) => {
            axios.post('api/roles' , editedItem )
            .then((response) => {
                if(response.data.status == 201){
                    ctx.commit('addRole' , response.data.data )
                }
                resolve(response);   
            })
            .catch((error) => {
                reject(response)
            })
        })
    },

    roleGet(ctx){
        return new Promise((resolve , reject )=> {
            axios.get('api/roles')
            .then((response) => {
                ctx.commit('setRoles' , response.data.data );
            })
            .catch((error) => {
                console.log(error);
            })
        })
    },

    roleDelete(ctx , item){
        return new Promise((resolve , reject ) =>{
            axios.delete(`api/roles/${item.id}`)
            .then((response) => {
                ctx.commit('DELETE_ROLE' , item)
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        });
        
    },

roleGetById(ctx , id){
        return new Promise ((resolve , reject ) => {
            axios.get(`api/roles/permission/${id}`)
            .then((response) => {
                const role = response.data.data
                ctx.commit('ROLE_BY_ID' , role)
                resolve(response)
            })
            .catch((error) => {
                reject(response)
            })
        })
    },

updateRole(ctx , editedItem){
        return new Promise((resolve , reject ) => {
            axios.put(`api/roles/${editedItem.id}`, editedItem)
            .then((response) => {
                ctx.commit('UPDATE_ROLE' , editedItem )
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        })
    },

allRoles(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/allroles')
            .then((response) => {    
                ctx.commit('SET_All_ROLES' , response.data.data )
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        });
    }

};