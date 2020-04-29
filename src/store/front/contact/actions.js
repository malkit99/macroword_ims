import axios from 'axios'
export default{
    saveContact(ctx , contact){
        return new Promise((resolve , reject) => {
            axios.get('airlock/csrf-cookie')
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
    }
};