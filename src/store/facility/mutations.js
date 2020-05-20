export default{
    SET_FACILITY(state , data){
        state.facilities = data
    },

    ADD_FACILITY(state , data){
        let facilities = state.facilities.concat(data);
        state.facilities = facilities
    },

    UPDATE_FACILITY_STATUS(state , item){
        const index = state.facilities.findIndex(facility => facility.id === item.id);
        if(index !== -1){
            state.facilities.splice(index , 1 , item);
        }
    },

    DELETE_FACILITY(state , item){
        state.facilities = state.facilities.filter(facility => facility.id !== item.id)
    },
};