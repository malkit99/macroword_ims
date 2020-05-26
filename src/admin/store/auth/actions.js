import axios from 'axios';
export default{

    async signIn ({ dispatch }, credentials) {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('api/admin/login', credentials)
        return dispatch('me')
      },
     
    async loggedOut ({ dispatch }) {
      await axios.post('api/admin/logout')
      return dispatch('me')
    },

      me({ commit }) {
        return axios.get('api/admin/user').then((response) => {
          commit('SET_ADMIN_LOGGEDIN', true)
          commit('SET_AUTH_USER', response.data.data)
          localStorage.setItem('admin_loggedin',true);
        }).catch(() => {
          commit('SET_ADMIN_LOGGEDIN', false)
          commit('SET_AUTH_USER', null)
          localStorage.removeItem('admin_loggedin',true);
        })
      },


      
    }
