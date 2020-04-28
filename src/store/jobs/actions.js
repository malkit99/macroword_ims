import axios from 'axios';
export default{
    getOpportunity(ctx){
        return new Promise((reslove , reject) => {
            axios.get('api/jobOpportunity')
            .then((response) => {
                const data = response.data.data ;
                ctx.commit('SET_OPPORTUNITY' , data)
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    saveJob(ctx , data){
        return new Promise((reslove , reject) => {
            axios.post('api/jobOpportunity' , data)
            .then((response) => {
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    deleteJob(ctx , item){
        return new Promise((reslove , reject) => {
            axios.delete(`api/jobOpportunity/${item.id}` , item)
            .then((response) => {
                ctx.commit('DELETE_JOB_OPPORTUNITY' , item)
                reslove(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },
    getJobById(ctx , id){
        return new Promise((reslove , reject) => {
            axios.get(`api/jobOpportunity/${id}`)
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
        axios.post(`api/jobOpportunity/status/${data.id}`, data)
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