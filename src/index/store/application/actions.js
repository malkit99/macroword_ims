export default{
    addNotification(ctx , payload){
        return new Promise((resolve , reject) => {
            ctx.commit('addNotification' , payload);
            resolve(true)
        })
    },


  
    removeNotification(ctx , payload){
      return new Promise((resolve , reject) => {
          ctx.commit('removeNotification' , payload);
          resolve(true)
      })
  }
  };