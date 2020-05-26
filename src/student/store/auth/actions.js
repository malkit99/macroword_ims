import axios from 'axios';
export default{

    async signIn ({ dispatch }, credentials) {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('api/student/login', credentials)
        return dispatch('me')
      },
     
    async loggedOut ({ dispatch }) {
      await axios.post('api/student/logout')
      return dispatch('me')
    },

      me({ commit }) {
        return axios.get('api/student/user').then((response) => {
          commit('SET_STUDENT_LOGGEDIN', true)
          commit('SET_STUDENT_AUTH_USER', response.data.data)
          localStorage.setItem('student_loggedin',true);
        }).catch(() => {
          commit('SET_STUDENT_LOGGEDIN', false)
          commit('SET_STUDENT_AUTH_USER', null)
          localStorage.removeItem('student_loggedin',true);
        })
      },


      
    }
