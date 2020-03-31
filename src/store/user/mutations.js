export default {
    setLoggedIn(state){
        state.isLoggedIn = true 
    },

    setUserDetails(state , payload){
        state.userDetail = payload
    },

    SET_LOGGED_OUT(state){
        state.isLoggedIn = false
    }
};