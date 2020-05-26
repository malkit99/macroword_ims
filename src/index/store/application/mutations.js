export default{
    addNotification(state , payload){
        state.notification.push(payload);
     },

     removeNotification(state , payload){
        state.notification.splice(payload , 1);
     },

};