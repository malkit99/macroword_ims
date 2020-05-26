export default{
    adminAuthencated(state){
        return state.loggedInValue
    },

    adminUser(state){
        return state.authUser ;
    }
};