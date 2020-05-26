export default{
    SET_DURATION(state , durations ){
        state.durations = durations
    },

    ADD_DURATION(state , editedItem){
        state.durations = state.durations.concat(editedItem);
    },

    UPDATE_DURATION(state , editedItem ){
        const index = state.durations.findIndex(duration => duration.id === editedItem.id);
        if(index !== -1){
            state.durations.splice(index , 1 , editedItem);
        }
    },

    DELETE_DURATION( state , item){
        state.durations = state.durations.filter(duration => duration.id !== item.id)
    },

    SET_COURSE_FEE(state , course_fee){
        state.fees = course_fee
    },

    ADD_COURSE_FEE(state , editedItem){
        state.fees = state.fees.concat(editedItem);
    },

    DELETE_COURSE_FEE( state , item){
        state.fees = state.fees.filter(fee => fee.id !== item.id)
    },

    UPDATE_COURSE_FEE(state , editedItem ){
        const index = state.fees.findIndex(fee => fee.id === editedItem.id);
        if(index !== -1){
            state.fees.splice(index , 1 , editedItem);
        }
    },

    SET_COURSE_CODE(state , course_code){
        state.course_codes = course_code
    },

    ADD_COURSE_CODE(state , editedItem){
        state.course_codes = state.course_codes.concat(editedItem);
    },

    DELETE_COURSE_CODE( state , item){
        state.course_codes = state.course_codes.filter(code => code.id !== item.id)
    },

    UPDATE_COURSE_CODE(state , editedItem ){
        const index = state.course_codes.findIndex(code => code.id === editedItem.id);
        if(index !== -1){
            state.course_codes.splice(index , 1 , editedItem);
        }
    },

    SET_BATCH_SIZE(state , batch){
        state.batches = batch
    },

    ADD_BATCH_SIZE(state , editedItem){
        state.batches = state.batches.concat(editedItem);
    },

    DELETE_BATCH_SIZE( state , item){
        state.batches = state.batches.filter(batch => batch.id !== item.id)
    },

    UPDATE_BATCH_SIZE(state , editedItem ){
        const index = state.batches.findIndex(batch => batch.id === editedItem.id);
        if(index !== -1){
            state.batches.splice(index , 1 , editedItem);
        }
    },
};