import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import application from './application'
import loading from './loading'



Vue.use(Vuex)

export default new Vuex.Store({

  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    application,
    loading,
  }
})
