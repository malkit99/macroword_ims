export default{
    ADD_LOADING(state , payload){
       state.loading.push(payload);
    },

    UPDATE_LOADING(state , payload){
        state.loading.splice(payload , 1);
     },
};