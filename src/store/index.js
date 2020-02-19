import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import application from './aplication/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    application
  }
})
