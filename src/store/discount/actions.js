import axios from 'axios';
export default{
    getDiscount(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/discount')
            .then((response) =>{
                if(response.status == 201){
                    const discount = response.data.data ;
                    ctx.commit('SET_DISCOUNT' , discount)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    saveDiscount(ctx , data){
        return new Promise((resolve , reject) => {
            axios.post('api/discount', data)
            .then((response) =>{
                if(response.status == 201){
                    const discount = response.data.data ;
                    ctx.commit('ADD_DISCOUNT' , discount)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    deleteDiscount(ctx , item){
        return new Promise((resolve , reject) => {
            axios.delete(`api/discount/${item.id}`, item)
            .then((response) =>{
                if(response.status == 202){
                    ctx.commit('DELETE_DISCOUNT' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },



    updateStatus(ctx , item){
        return new Promise((resolve , reject) => {
            axios.post(`api/discount/status/${item.id}`, item)
            .then((response) => {
                if(response.status == 201){
                    const item = response.data.data
                    ctx.commit('UPDATE_DISCOUNT_STATUS' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
};