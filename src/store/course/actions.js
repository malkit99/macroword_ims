import axios from "axios";
export default{

    saveCourse(ctx , data ){
        return new Promise((resolve , reject ) => {
            axios.post('api/course' , data)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('ADD_COURSE' , data )
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    updateCourse(ctx , data ){
        return new Promise((resolve , reject ) => {
            axios.post(`api/course/${id}` , data)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('ADD_COURSE' , data )
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    getCourse(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/course')
            .then((response) => {
            const courses = response.data.data
               ctx.commit('SET_COURSES' , courses)
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    getCourseBySlug(ctx , slug ){
        return new Promise((resolve , reject ) => {
            axios.get(`api/course/course-slug/${slug}`)
            .then((response) => {
                if(response.status == 201 ){
                    const course = response.data.data
                    ctx.commit('SET_COURSE_BY_SLUG' , course);
                }

                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    getCourseById(ctx , slug ){
        return new Promise((resolve , reject ) => {
            axios.get(`api/course/${slug}`)
            .then((response) => {
                if(response.status == 201 ){
                    const course = response.data.data
                    ctx.commit('SET_COURSE_BY_SLUG' , course);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },


    getContentById(ctx , subject){
        return new Promise((resolve , reject) => {
            axios.get(`api/subject/${subject.id}`)
            .then((response) =>{
                if(response.status == 201){
                    const contents = response.data.data
                    ctx.commit('SET_CONTENT_BY_ID' , contents)
                }
            })
            .catch((error) => {
                console.log(error)
            });
        })
    },

    removeCourse( ctx , item ){
        return new Promise((resolve , reject) => {
          axios.delete(`api/course/${item.id}`)
          .then((response) => {   
              ctx.commit('DELETE_COURSE' , item)
              resolve(response) 
          })
          .catch((error) => {
            reject(error)
          })
        })
      },

      updateStatus(ctx , item){
        return new Promise((resolve , reject) => {
            axios.post(`api/course/status/${item.id}`, item)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('UPDATE_COURSE_STATUS' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    popularStatus(ctx , item){
        return new Promise((resolve , reject) => {
            axios.post(`api/course/popular/${item.id}`, item)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('UPDATE_POPULAR_STATUS' , item)
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
};