export default{
    SET_COUNTRIES(state , country){
        state.countries = country
    },

    SET_STATES(state , states){
        state.states = states
    },

    SET_CITIES(state , cities){
        state.cities = cities
    },

    ADD_COUNTRIES(state , editedItem){
        state.countries = state.countries.concat(editedItem);
    },

    ADD_STATE(state , editedItem){
        state.states = state.states.concat(editedItem);
    },

    ADD_CITIES(state , editedItem){
        state.cities = state.cities.concat(editedItem);
    },

    UPDATE_STATES(state , editedItem){
        const index = state.states.findIndex(state => state.id === editedItem.id);
        if(index !== -1){
            state.states.splice(index , 1 , editedItem);
        }
    },

    UPDATE_CITY(state , editedItem){
        const index = state.cities.findIndex(city => city.id === editedItem.id);
        if(index !== -1){
            state.cities.splice(index , 1 , editedItem);
        }
    },

    UPDATE_COUNTRY(state , editedItem){
        const index = state.countries.findIndex(country => country.id === editedItem.id);
        if(index !== -1){
            state.countries.splice(index , 1 , editedItem);
        }
    },

    DELETE_COUNTRY(state , item){
        state.countries = state.countries.filter(country => country.id !== item.id)
    },

    DELETE_STATE(state , item){
        state.states = state.states.filter(state => state.id !== item.id)
    },
};