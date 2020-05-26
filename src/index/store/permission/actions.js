import axios from "axios";

export default{


    permissionSave(ctx , editedItem){
          return new Promise((resolve , reject) => {
              axios.post('api/permissions', editedItem)
              .then((response) => {
                ctx.commit('addPermission' , editedItem );
                resolve(response)
              })
              .catch((error) => {
                 reject(response);  
              })
          })
    },
   

    async permissionGet({commit}){
      const response = await axios.get('api/permissions');
      commit('setPermission', response.data.data );
      },

      removePermission( ctx , item ){
        return new Promise((resolve , reject) => {
          axios.delete(`api/permissions/${item.id}`)
          .then((response) => {
            if (response.data.message == 'success'){
              ctx.commit('DELETE_PERMISSION' , item)
              resolve(response)
            }
          })
          .catch((error) => {
            reject(response)
          })
        })
      },

      permissionEdit(ctx , editedItem ){
        return new Promise((resolve , reject) => {
          axios.put(`api/permissions/${editedItem.id}` , editedItem)
          .then((response) => {
            console.log(response.data.message);
            if(response.data.message == 'update'){
              ctx.commit('UPDATE_PERMISSION' , editedItem )
              resolve(response);
            }
          })
          .catch((error) => {
            reject(response)
          })
        })
      },

    
  };