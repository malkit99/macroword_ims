export default{
    setRoles(state , payload){
        state.roles = payload
    },

    addRole( state , role){
        let roles = state.roles.concat(role);
        state.roles = roles
    },

    UPDATE_ROLE(state , editedItem){
        const index = state.roles.findIndex(item => item.id === editedItem.id);
        if(index !== -1){
            state.roles.splice(index , 1 , editedItem);
        }
    },

    DELETE_ROLE( state , item ){
        state.roles = state.roles.filter(role => role.id !== item.id)
    },

    ROLE_BY_ID(state , role){
        state.roleById = role
    },

    SET_All_ROLES(state , payload){
        state.rolesAll = payload
    }
   
};