import axios from 'axios'
export default{

    saveContent(ctx , data ){
        return new Promise((resolve , reject ) => {
            axios.post('api/content' , data)
            .then((response) => {
                if(response.status == 201){
                    const subject = response.data.data
                    ctx.commit('ADD_SUBJECT' , subject);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    updateContent(ctx , data ){
        return new Promise((resolve , reject ) => {
            axios.put(`api/content/${data.id}` , data)
            .then((response) => {
                if(response.status == 201){
                   console.log(response)
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    getSubject(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/subject')
            .then((response) => {
                if(response.status == 201){
                    const subject = response.data.data
                    ctx.commit('SET_SUBJECT' , subject)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    getContentById( ctx , id){
        return new Promise((resolve , reject) => {
            axios.get(`api/subject/${id}`)
            .then((response) => {
                if(response.status == 201){
                     resolve(response);
                }
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    

};