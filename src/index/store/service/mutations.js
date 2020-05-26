export default{
    SET_SERVICE(state , data ){
        state.services = data
    },

    ADD_SERVICE(state , data){
         let services = state.services.concat(data);
         state.services = services
    },

    DELETE_SERVICE(state , item){
        state.services = state.services.filter(service => service.id !== item.id)
    },

    
    UPDATE_SERVICE_STATUS(state , item){
        const index = state.services.findIndex(service => service.id === item.id);
        if(index !== -1){
            state.services.splice(index , 1 , item);
        }
    },
};