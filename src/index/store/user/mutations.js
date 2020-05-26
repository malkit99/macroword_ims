export default {
    setLoggedIn(state){
        state.isLoggedIn = true 
    },

    setUserDetails(state , data){
        state.userDetail = data
    },

    REMOVE_USER_DETAILS(state){
        state.userDetail = null
    },

    SET_LOGGED_OUT(state){
        state.isLoggedIn = false
    },

    SET_LOGGED_IN_STATE_TRUE(state){
        state.isLoggedIn = true
    },

    SET_LOGGED_IN_STATE_FALSE(state){
        state.isLoggedIn = false
    },
};