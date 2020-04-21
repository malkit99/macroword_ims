import axios from 'axios';
export default{
  getEvents(ctx){
    return new Promise((reslove , reject ) => {
        axios.get('api/event')
        .then((response) => {
            if(response.status == 201){
                const events = response.data.data;
                ctx.commit('SET_EVENTS' , events);
            }
            reslove(response);
        })
        .catch((error) => {
            reject(error);
        })
    });
  },

  saveEvent(ctx , data){
    return new Promise((reslove , reject ) => {
        axios.post('api/event', data)
        .then((response) => {
            if(response.status == 201){
               ctx.commit('ADD_EVENT' , data) 
            }
            reslove(response);
        })
        .catch((error) => {
            reject(error);
        })
    });
  },

  getEventById(ctx , id){
    return new Promise((reslove , reject ) => {
        axios.get(`api/event/${id}`)
        .then((response) => {
            if(response.status == 201){
               
            }
            reslove(response);
        })
        .catch((error) => {
            reject(error);
        })
    });
  },

  deleteEvents(ctx , item){
    return new Promise((reslove , reject ) => {
        axios.delete(`api/event/${item.id}`)
        .then((response) => {
            ctx.commit('DELETE_EVENT' , item);
            reslove(response);
        })
        .catch((error) => {
            reject(error);
        })
    });
  },

  updateStatus(ctx , data){
    return new Promise((reslove , reject ) => {
        axios.post(`api/event/status/${data.id}`, data)
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