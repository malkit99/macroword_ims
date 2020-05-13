import axios from 'axios';
export default{

    getWebsite(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/website-detail')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_WEB_DETAIL' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },
    getSlider(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/slider-image')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_SLIDER' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },

    getService(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/our-service')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_SERVICE' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },

    getTestimonial(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/our-testimonial')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_TESTIMONIAL' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },

    getPopularCourse(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/our-course')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_POPULAR_COURSE' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },

    getEvent(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/our-event')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_EVENT' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },

    getAuthorization(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/our-authorization')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_AUTHORIZATION' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },

    getTeam(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/our-team')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_TEAM' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },

    getCategory(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/our-category')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_CATEGORY' , data);
                }
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            })

        });
    },

    getcourseBySlug(ctx , item){
        return new Promise((resolve , reject) => {
            axios.get(`api/category/course-slug/${item}`)
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_COURSES' , data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        })
    },

    singleCourseBySlug(ctx , item){
        return new Promise((resolve , reject) => {
            axios.get(`api/course/slug/${item}`)
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_SINGLE_COURSE' , data);
                }
                resolve(response);
            })
            .catch((error) => {
               reject(error);
            })
        })
    },

    getContentBySlug(ctx , item){
        return new Promise((resolve , reject) => {
            axios.get(`api/subject/slug/${item}`)
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_COURSE_CONTENT' , data);
                }
                resolve(response);
            })
            .catch((error) => {
               reject(error);
            })
        })
    },

    getJobOpportunity(ctx , item){
        return new Promise((resolve , reject) => {
            axios.get('api/our-job')
            .then((response) => {
                if(response.status == 201){
                    const data = response.data.data ;
                    ctx.commit('SET_Job_OPPORTUNITY' , data);
                }
                resolve(response);
            })
            .catch((error) => {
               reject(error);
            })
        })
    },
};