export default{
    studentAuthencated(state){
        return state.StudentloggedInValue
    },

    studentUser(state){
        return state.studentAuthUser;
    }
};