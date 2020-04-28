export default{
    SET_OPPORTUNITY(state , data){
        state.opportunity = data
    },

    DELETE_JOB_OPPORTUNITY(state , item){
        state.opportunity = state.opportunity.filter(job => job.id !== item.id)
    },
    
    UPDATE_STATUS(state , data){
        const index = state.opportunity.findIndex(job => job.id === data.id);
        if(index !== -1){
            state.opportunity.splice(index , 1 , data);
        }
    },
};