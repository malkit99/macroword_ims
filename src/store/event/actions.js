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
                
            }
            reslove(response);
        })
        .catch((error) => {
            reject(error);
        })
    });
  },
};