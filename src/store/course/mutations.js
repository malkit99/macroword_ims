
export default{
    SET_COURSES(state , courses){
        state.courses = courses
    },

    ADD_COURSE(state , data){
        let courses = state.courses.concat(data)
        state.courses = courses
    },

    SET_COURSE_BY_SLUG(state , course ){
        state.courseBySlug = course
    },

    SET_CONTENT_BY_ID(state , contents ){
        state.contentById = contents
    },

    DELETE_COURSE(state , item){
        state.courses = state.courses.filter(course => course.id !== item.id)
    }
};