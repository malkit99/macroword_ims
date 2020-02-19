export default {
    setLoggedIn(state , payload){
        state.isLoggedIn = payload 
    },

    setUserDetails(state , payload){
        state.userDetail = payload
    }
};