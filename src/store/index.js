import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import application from './aplication/index'
import permission from './permission/index'
import role from './role/index'
import register from './register/index'
import category from './category/index'

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
    application,
    permission,
    role,
    register,
    category,
  }
})
