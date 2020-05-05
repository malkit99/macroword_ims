import axios from 'axios';
export default{
    getService(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/service')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data;
                    ctx.commit('SET_SERVICE' , data);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    saveService(ctx , data ){
        return new Promise((resolve , reject) => {
            axios.post('api/service' , data)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('ADD_SERVICE' , data);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    getServiceBYId(ctx , id ){
        return new Promise((resolve , reject) => {
            axios.get(`api/service/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    deleteService(ctx , item){
        return new Promise((resolve , reject) => {
            axios.delete(`api/service/${item.id}`)
            .then((response) => {
                ctx.commit('DELETE_SERVICE' , item)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    
    updateStatus(ctx , item){
        return new Promise((resolve , reject) => {
            axios.post(`api/service/status/${item.id}`, item)
            .then((response) => {
                if(response.status == 201){
                    const item = response.data.data;
                    ctx.commit('UPDATE_SERVICE_STATUS' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
};