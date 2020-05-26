import axios from 'axios';
export default{

    async signIn ({ dispatch }, credentials) {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('api/login', credentials)
  
        return dispatch('me')
      },
     
    async loggedOut ({ dispatch }) {
      await axios.post('api/logout')
      return dispatch('me')
    },

      me({ commit }) {
        return axios.get('api/user').then((response) => {
          commit('SET_AUTHENTICATED', true)
          commit('SET_USER', response.data.data)
          localStorage.setItem('loggedin',true);
        }).catch(() => {
          commit('SET_AUTHENTICATED', false)
          commit('SET_USER', null)
          localStorage.removeItem('loggedin',true);
        })
      },


      
    }
