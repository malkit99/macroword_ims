export default{
    addLoading(ctx , payload){
        return new Promise((resolve , reject) => {
            ctx.commit('ADD_LOADING', payload);
            resolve(true);
        })
    },

    removeloading(ctx , payload){
        return new Promise((resolve , reject) => {
            ctx.commit('UPDATE_LOADING', payload);
            resolve(true);
        })
    },
};