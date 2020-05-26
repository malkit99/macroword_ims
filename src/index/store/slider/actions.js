import axios from "axios";

export default{
    getSlider(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/slider')
            .then((response) => {
                    if(response.status == 201){
                        const slider = response.data.data ;
                       ctx.commit('SET_SLIDER' , slider) 
                    }
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    },

    saveSlider(ctx , data){
        return new Promise((resolve , reject) => {
            axios.post('api/slider' , data )
            .then((response) => {
                    if(response.status == 201){
                        const slider = response.data.data ;
                       ctx.commit('SET_SLIDER' , slider) 
                    }
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    },

    updateStatus(ctx , item){
        return new Promise((resolve , reject) => {
            axios.post(`api/slider/status/${item.id}`, item)
            .then((response) => {
                if(response.status == 201){
                    const item = response.data.data;
                    ctx.commit('UPDATE_SLIDER_STATUS' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    deleteSlider(ctx , item){
        return new Promise((resolve , reject) => {
            axios.delete(`api/slider/${item.id}`, item)
            .then((response) => { 
                ctx.commit('DELETE_SLIDER' , item)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

};