export default{
    SET_DISCOUNT(state , discount){
        state.discounts = discount
    },

    ADD_DISCOUNT(state , discount){
        state.discounts = state.discounts.concat(discount);
    },

    DELETE_DISCOUNT(state , item ){
        state.discounts = state.discounts.filter(discount => discount.id !== item.id)
    },

    UPDATE_DISCOUNT_STATUS(state , item){
        const index = state.discounts.findIndex(discount => discount.id === item.id);
        if(index !== -1){
            state.discounts.splice(index , 1 , item);
        }
    },
};