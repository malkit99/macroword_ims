import axios from 'axios'
export default{
    getBatchSize(ctx){
        return new Promise((reslove ,reject)=>{
            axios.get('api/batch')
            .then((response) => {
            if(response.status == 201){
                const batch = response.data.data;
                ctx.commit('SET_BATCH_SIZE' , batch)
            }
               reslove(response); 
            })
            .catch((error) => {
                reject(error)
            });
        });
    },

    getDuration(ctx){
        return new Promise((reslove ,reject)=>{
            axios.get('api/duration')
            .then((response) => {
            if(response.status == 201){
                const durations = response.data.data;
                ctx.commit('SET_DURATION' , durations)
            }
            reslove(response); 
            })
            .catch((error) => {
                reject(error)
            });
        });
    },

getCourseFee(ctx){
    return new Promise((reslove ,reject)=>{
        axios.get('api/course-fee')
        .then((response) => {
        if(response.status == 201){
            const course_fee = response.data.data;
            ctx.commit('SET_COURSE_FEE' , course_fee)
        }
           reslove(response); 
        })
        .catch((error) => {
            reject(error)
        });
    });
},

getCourseCode(ctx){
    return new Promise((reslove ,reject)=>{
        axios.get('api/course-code')
        .then((response) => {
        if(response.status == 201){
            const course_code = response.data.data;
            ctx.commit('SET_COURSE_CODE' , course_code)
        }
           reslove(response); 
        })
        .catch((error) => {
            reject(error)
        });
    });
},

saveBatchSize(ctx , editedItem){
    return new Promise((resolve , reject) => {
        axios.post('api/batch' , editedItem)
        .then((response) =>{
            if(response.status == 201){
                ctx.commit('ADD_BATCH_SIZE', editedItem )
            }  
          resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
      
    })
},

saveDuration(ctx , editedItem){
        return new Promise((resolve , reject) => {
            axios.post('api/duration' , editedItem)
            .then((response) =>{
                if(response.status == 201){
                    ctx.commit('ADD_DURATION', editedItem )
                }  
              resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
          
        })
    },

    saveCourseFee(ctx , editedItem){
        return new Promise((resolve , reject) => {
            axios.post('api/course-fee' , editedItem)
            .then((response) =>{
                if(response.status == 201){
                    ctx.commit('ADD_COURSE_FEE', editedItem )
                }  
              resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
          
        })
    },

saveCourseCode(ctx , editedItem){
    return new Promise((resolve , reject) => {
        axios.post('api/course-code' , editedItem)
        .then((response) =>{
            if(response.status == 201){
                ctx.commit('ADD_COURSE_CODE', editedItem )
            }  
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
        
    })
},

updateBatchSize(ctx , editedItem ){
    return new Promise((resolve , reject ) => {
        axios.put(`api/batch/${editedItem.id}` , editedItem)
        .then((response) => {
            if(response.status == 202){
                ctx.commit('UPDATE_BATCH_SIZE' , editedItem);
            }
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
},

updateDuration(ctx , editedItem ){
    return new Promise((resolve , reject ) => {
        axios.put(`api/duration/${editedItem.id}` , editedItem)
        .then((response) => {
            if(response.status == 202){
                ctx.commit('UPDATE_DURATION' , editedItem);
            }
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
},

    updateCourseFee(ctx , editedItem ){
        return new Promise((resolve , reject ) => {
            axios.put(`api/course-fee/${editedItem.id}` , editedItem)
            .then((response) => {
                if(response.status == 202){
                    ctx.commit('UPDATE_COURSE_FEE' , editedItem);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    updateCourseCode(ctx , editedItem ){
        return new Promise((resolve , reject ) => {
            axios.put(`api/course-code/${editedItem.id}` , editedItem)
            .then((response) => {
                if(response.status == 202){
                    ctx.commit('UPDATE_COURSE_CODE' , editedItem);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },


    deleteBatchSize(ctx , item ){
        return new Promise((resolve , reject ) => {
            axios.delete(`api/batch/${item.id}` , item)
            .then((response) => {
                if(response.status == 204){
                    ctx.commit('DELETE_BATCH_SIZE' , item );
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },


deleteDuration(ctx , item ){
    return new Promise((resolve , reject ) => {
        axios.delete(`api/duration/${item.id}` , item)
        .then((response) => {
            if(response.status == 204){
                ctx.commit('DELETE_DURATION' , item );
            }
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
},

    deleteCourseFee(ctx , item ){
        return new Promise((resolve , reject ) => {
            axios.delete(`api/course-fee/${item.id}` , item)
            .then((response) => {
                if(response.status == 204){
                    ctx.commit('DELETE_COURSE_FEE' , item );
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    deleteCourseCode(ctx , item ){
        return new Promise((resolve , reject ) => {
            axios.delete(`api/course-code/${item.id}` , item)
            .then((response) => {
                if(response.status == 204){
                    ctx.commit('DELETE_COURSE_CODE' , item );
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    
};