import axios from 'axios';
export default{
    getFacility(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/facility')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data
                    ctx.commit('SET_FACILITY' , data)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    getFacilityById(ctx , id){
        return new Promise((resolve , reject) => {
            axios.get(`api/facility/${id}`)
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
            axios.post(`api/facility/status/${item.id}`, item)
            .then((response) => {
                if(response.status == 201){
                    const item = response.data.data;
                    ctx.commit('UPDATE_FACILITY_STATUS' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    deleteFacility(ctx , item){
        return new Promise((resolve , reject) => {
            axios.delete(`api/facility/${item.id}`)
            .then((response) => {
                    ctx.commit('DELETE_FACILITY' , item)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    
    saveFacility(ctx , data){
        return new Promise((resolve , reject) => {
            axios.post('api/facility' , data)
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data
                    ctx.commit('ADD_FACILITY' , data)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
};