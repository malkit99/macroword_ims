export default{
    SET_TESTIMONIALS(state , data){
        state.testimonials = data
    },

    ADD_TESTIMONIAL(state , data){
        let testimonials = state.testimonials.concat(data)
        state.testimonials = testimonials
    },

    DELETE_TESTIMONIAL(state , item){
        state.testimonials = state.testimonials.filter(testi => testi.id !== item.id)
    },

    UPDATE_TESTIMONIAL_STATUS(state , item){
        const index = state.testimonials.findIndex(testi => testi.id === item.id);
        if(index !== -1){
            state.testimonials.splice(index , 1 , item);
        }
    },

  
};