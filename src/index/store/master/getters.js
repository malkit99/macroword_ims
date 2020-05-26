export default{
    getDuration(state){
        return state.durations 
    },

    getCourseFee(state){
        return state.fees 
    },

    getCourseCode(state){
        return state.course_codes
    },

    getBatchSize(state){
        return state.batches
    }
};