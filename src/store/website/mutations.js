export default{
    SET_WEBSITE(state , data){
        state.website = data
    },

    ADD_WEBSITE(state , data){
        state.website = state.website.concat(data)
    },

    UPDATE_WEBSITE_STATUS(state , item){
        const index = state.website.findIndex(web => web.id === item.id);
        if(index !== -1){
            state.website.splice(index , 1 , item);
        }
    },
};