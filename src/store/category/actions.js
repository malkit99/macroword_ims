import axios from "axios";

export default{
  
    saveCategory(ctx , editedItem){
        return new Promise ((resolve , reject)=>{
            axios.post('api/category', editedItem)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('ADD_CATEGORY' , editedItem);
                    resolve(response);
                }
            })
            .catch((error) => {
                reject(response);
            })
        });
    },

    deleteCategory(ctx , item){
        return new Promise ((resolve , reject)=>{
            axios.delete(`api/category/${item.id}`, item)
            .then((response) => { 
                ctx.commit('DELETE_CATEGORY' , item);
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        });
    },

    updateCategory(ctx , editedItem){
        return new Promise ((resolve , reject)=>{
            axios.put(`api/category/${editedItem.id}`, editedItem)
            .then((response) => { 
                ctx.commit('UPDATE_CATEGORY' , editedItem );
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        });
    },

    getCategory(ctx ){
        return new Promise ((resolve , reject)=>{
            axios.get('api/category')
            .then((response) => {
                const categories = response.data.data
                ctx.commit('GET_CATEGORY' , categories );
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
        });
    },
};