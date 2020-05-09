export default{
    SET_SLIDER(state , slider){
        state.sliders = slider
    },

    UPDATE_SLIDER_STATUS(state , item){
        const index = state.sliders.findIndex(slider => slider.id === item.id);
        if(index !== -1){
            state.sliders.splice(index , 1 , item);
        }
    },

    
    DELETE_SLIDER(state , item){
        state.sliders = state.sliders.filter(slider => slider.id !== item.id)
    },
};