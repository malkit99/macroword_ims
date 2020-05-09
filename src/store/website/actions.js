import axios from 'axios';
export default{
    getWebsite(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/website')
            .then((response) => {
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
};