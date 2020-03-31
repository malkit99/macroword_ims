export default{
    SET_USERS(state , users ){
        state.users = users
    },

    ADD_User(state , users){
        state.users = state.users.concat(users);
    },

    UPDATE_USER(state , item){
        const index = state.users.findIndex(user => user.id === item.id);
        if(index !== -1){
            state.permission.splice(index , 1 , item);
        }
    },

    SET_USER_BY_ID(state, user){
        state.userbyId = user
    },

    DELETE_USER( state , item){
        state.users = state.users.filter(user => user.id !== item.id)
    },

   
};