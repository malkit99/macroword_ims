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
    }
};