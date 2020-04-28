import axios from 'axios'
export default{
    getAuthorization(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/authorization')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data
                    ctx.commit('SET_AUTHORIZATION' , data);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    saveAuthorization(ctx , data){
        return new Promise((resolve , reject) => {
            axios.post('api/authorization', data)
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data
                    ctx.commit('ADD_AUTHORIZATION' , data);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    deleteAuthorization(ctx , item){
        return new Promise((reslove , reject) => {
            axios.delete(`api/authorization/${item.id}` , item)
            .then((response) => {
                ctx.commit('DELETE_AUTHORIZATION' , item)
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    getByIdAuthorization(ctx , id){
        return new Promise((reslove , reject) => {
            axios.get(`api/authorization/${id}`)
            .then((response) => {
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    
  updateStatus(ctx , data){
    return new Promise((reslove , reject ) => {
        axios.post(`api/authorization/status/${data.id}`, data)
        .then((response) => {
            const data = response.data.data;
            ctx.commit('UPDATE_STATUS' , data)
            reslove(response);
        })
        .catch((error) => {
            reject(error);
        })
    });
  },
};