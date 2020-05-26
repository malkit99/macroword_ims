import axios from 'axios';
export default{
    getWebsite(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/website')
            .then((response) => {
                const data = response.data.data ;
                ctx.commit('SET_WEBSITE', data);
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            }) 
        });
    },

    saveWebsiteDetail(ctx , data){
        return new Promise((resolve , reject) => {
            axios.post('api/website', data)
            .then((response) => {
                ctx.commit('ADD_WEBSITE' , data);
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    deleteWebDeatil(ctx , item){
        return new Promise((resolve , reject) => {
            axios.delete(`api/website/${item.id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    updateStatus(ctx , item){
        return new Promise((resolve , reject) => {
            axios.post(`api/website/status/${item.id}`, item)
            .then((response) => {
                if(response.status == 201){
                    const item = response.data.data;
                    ctx.commit('UPDATE_WEBSITE_STATUS' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
};