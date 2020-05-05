import axios from 'axios';
export default{
    getCountries(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/country')
            .then((response) => {
                if(response.status == 201){
                    const country = response.data.data;
                    ctx.commit('SET_COUNTRIES' , country);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    getStates(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/state')
            .then((response) => {
                if(response.status == 201){
                    const states = response.data.data;
                    ctx.commit('SET_STATES' , states);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    getCities(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/city')
            .then((response) => {
                if(response.status == 201){
                    const cities = response.data.data;
                    ctx.commit('SET_CITIES' , cities);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    saveCountries(ctx , editedItem){
        return new Promise((resolve , reject) => {
            axios.post('api/country' , editedItem)
            .then((response) => {
                if(response.status == 201){
                    const editedItem = response.data.data
                    ctx.commit('ADD_COUNTRIES' , editedItem);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    saveState(ctx , editedItem){
        return new Promise((resolve , reject) => {
            axios.post('api/state' , editedItem)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('ADD_STATE' , editedItem);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    saveCities(ctx , editedItem){
        return new Promise((resolve , reject) => {
            axios.post('api/city' , editedItem)
            .then((response) => {
                if(response.status == 201){
                    ctx.commit('ADD_CITIES' , editedItem);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    updateState(ctx , editedItem){
        return new Promise((resolve , reject) => {
            axios.put(`api/state/${editedItem.state_id}` , editedItem)
            .then((response) => {
                if(response.status == 201){
                    const editedItem = response.data.data
                    ctx.commit('UPDATE_STATES' , editedItem);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    updateCity(ctx , editedItem){
        return new Promise((resolve , reject) => {
            axios.put(`api/city/${editedItem.city_id}` , editedItem)
            .then((response) => {
                if(response.status == 201){
                    const editedItem = response.data.data
                    ctx.commit('UPDATE_CITY' , editedItem);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    updateCountries(ctx , editedItem){
        return new Promise((resolve , reject) => {
            axios.put(`api/country/${editedItem.country_id}` , editedItem)
            .then((response) => {
                if(response.status == 201){
                    const editedItem = response.data.data
                    ctx.commit('UPDATE_COUNTRY' , editedItem);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    deleteCountry(ctx , item){
        return new Promise((resolve , reject) => {
            axios.delete(`api/country/${item.country_id}`)
            .then((response) => {
                if(response.status == 202){
                    ctx.commit('DELETE_COUNTRY' , item);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },

    deleteState(ctx , item){
        return new Promise((resolve , reject) => {
            axios.delete(`api/state/${item.state_id}`)
            .then((response) => {
                if(response.status == 202){
                    ctx.commit('DELETE_STATE' , item);
                }
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    },
};