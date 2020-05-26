import axios from 'axios'
export default{
    saveContact(ctx , contact){
        return new Promise((resolve , reject) => {
            axios.get('sanctum/csrf-cookie')
            .then((response) => {
                axios.post('api/contact-us' , contact)
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
            })
        });
    },


    saveRegisterDiscount(ctx , contact){
        return new Promise((resolve , reject) => {
            axios.get('sanctum/csrf-cookie')
            .then((response) => {
                axios.post('api/register-discount' , contact)
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
            })
        });
    },

    saveCalBack(ctx , contact){
        return new Promise((resolve , reject) => {
            axios.get('sanctum/csrf-cookie')
            .then((response) => {
                axios.post('api/call-back' , contact)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
            })
        });
    },
};