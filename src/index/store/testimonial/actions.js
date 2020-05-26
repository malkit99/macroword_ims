import axios from 'axios';
export default{
    getTestimonials(ctx){
        return new Promise((reslove , reject) => {
            axios.get('api/testimonial')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data
                    ctx.commit('SET_TESTIMONIALS' , data);
                }
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    getByIdTestimonial(ctx , id ){
        return new Promise((reslove , reject) => {
        axios.get(`api/testimonial/${id}`)
            .then((response) => {
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    saveTestimonial(ctx , data){
        return new Promise((reslove , reject) => {
            axios.post('api/testimonial' , data)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('ADD_TESTIMONIAL' , data);
                }
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    deleteTestimonial(ctx , item){
        return new Promise((reslove , reject) => {
            axios.delete(`api/testimonial/${item.id}`)
            .then((response) => {
                if(response.status == 200){
                    ctx.commit('DELETE_TESTIMONIAL' , item)
                }
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    updateStatus(ctx , item){
        return new Promise((resolve , reject) => {
            axios.post(`api/testimonial/status/${item.id}`, item)
            .then((response) => {
                if(response.status == 201){
                    const item = response.data.data;
                    ctx.commit('UPDATE_TESTIMONIAL_STATUS' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
};