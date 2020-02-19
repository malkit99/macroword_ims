export default{
    isLoggedIn:false,
    userDetail:{}
};

const getters = {
    loggedIn(state){
        return state.isLoggedIn
    }
};