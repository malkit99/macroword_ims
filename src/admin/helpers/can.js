import store from '../store'
export default (permissions) => {
    
const userPermissions = store.getters['auth/user'].permissions
    let canEnter = false;
    
    if(!userPermissions || !permissions){
        return canEnter;
    }
    if(!Array.isArray(permissions)){
        
        canEnter =  userPermissions.includes(permissions);

    }else{

        permissions.forEach(permission => {
            if(userPermissions.includes(permission)){

                canEnter =  userPermissions.includes(permission)
            }
            
        });
    }

    return canEnter 
}