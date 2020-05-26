export default{
    setPermission(state , payload){
        state.permission = payload 
    },

    addPermission(state , editedItem){
       let permissions =  state.permission.concat(editedItem);
       state.permission = permissions
    },

    UPDATE_PERMISSION(state , editedItem){
        const index = state.permission.findIndex(item => item.id === editedItem.id);
        if(index !== -1){
            state.permission.splice(index , 1 , editedItem);
        }
    },

  

    DELETE_PERMISSION(state , item){
      state.permission = state.permission.filter(permission => permission.id !== item.id)
    }
};