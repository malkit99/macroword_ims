import can from '../helpers/can'
import store from '../store'
export default function checkPermissions({next , from , router, to}){
    const requiredPermissions = to.meta.permissions
   
    if(!from.name){
        store.dispatch('auth/me').then(() => {

          const canEnter = can(requiredPermissions);
            
            if(canEnter){
                
                return next();
        
            }
            return router.push({ name: 'dashboard'})
        })
    }
    else{ 
        const canEnter = can(requiredPermissions);
        if(canEnter){
            
            return next();
    
        }
        return router.push({ name: 'dashboard'})
    }




}