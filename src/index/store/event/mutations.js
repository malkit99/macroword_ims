export default{
    SET_EVENTS(state , events){
        state.events = events 
    },

    ADD_EVENT(state , data){
        let events = state.events.concat(data)
        state.events = events
    },

    UPDATE_EVENT(state , data){
        const index = state.events.findIndex(event => event.id === data.id);
        if(index !== -1){
            state.events.splice(index , 1 , data);
        }
    },

    UPDATE_STATUS(state , data){
        const index = state.events.findIndex(event => event.id === data.id);
        if(index !== -1){
            state.events.splice(index , 1 , data);
        }
    },

    DELETE_EVENT(state, item){
        state.events = state.events.filter(event => event.id !== item.id)
    }
};