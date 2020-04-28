export default{
    SET_AUTHORIZATION(state , data){
        state.authorization = data
    },

    ADD_AUTHORIZATION(state , data){
        let authorization = state.authorization.concat(data)
        state.authorization = data
    },

    DELETE_AUTHORIZATION( state , item ){
        state.authorization = state.authorization.filter(auth => auth.id !== item.id)
    },

    UPDATE_STATUS(state , data){
        const index = state.authorization.findIndex(auth => auth.id === data.id);
        if(index !== -1){
            state.authorization.splice(index , 1 , data);
        }
    },
};