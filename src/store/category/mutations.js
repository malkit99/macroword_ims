export default{
  
    GET_CATEGORY( state , categories){
        state.dessert = categories
    },
    ADD_CATEGORY(state , editedItem){
        state.desserts = editedItem
    },
    DELETE_CATEGORY(state , item){
        state.desserts = state.desserts.filter(dessert => dessert.id !== item.id)
    },

    UPDATE_CATEGORY(state , editedItem){
        const index = state.desserts.findIndex(item => item.id === editedItem.id);
        if(index !== -1){
            state.desserts.splice(index , 1 , editedItem);
        }
    }
};