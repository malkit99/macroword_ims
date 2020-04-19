
export default{
    SET_SUBJECT(state , subject){
        state.subjects = subject
    },

    ADD_SUBJECT(state , subject){
        state.subjects = state.subjects.concat(subject)
    },
     

};