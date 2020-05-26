export default{
    getWebsiteDetails(state){
        return state.websiteDetails ;
    },

    getSlider(state){
        return state.sliders ;
    },

    getService(state){
        return state.services ;
    },

    
    getTestimonial(state){
        return state.testimonials ;
    },

    getPopularCourse(state){
        return state.popularCourse ;
    },

    getEvent(state){
        return state.events ;
    },

    getAuthorization(state){
        return state.authorizations ;
    },

    getTeam(state){
        return state.teams ;
    },
    getCategory(state){
        return state.categories ;
    },
    getCourseByCategorySlug(state){
        return state.allCourses ;
    },

    getSingleCourseBySlug(state){
        return state.singleCourse ;
    },

    getContentBySlug(state){
        return state.courseContent ;
    },

    getJobOpportunity(state){
        return state.jobOpportunities ;
    },

    getFacility(state){
        return state.facilities ;
    },

    getDiscount(state){
        return state.discounts ;
    },
    getCourseName(state){
        return state.courseName;
    },
    getCourseDiscountName(state){
        return state.courseDiscountName;
    },
};