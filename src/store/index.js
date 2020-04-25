import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import application from './aplication/index'
import permission from './permission/index'
import role from './role/index'
import register from './register/index'
import category from './category/index'
import master from './master/index'
import content from './content/index'
import course from './course/index'
import team from './team/index'
import event from './event/index'
import testimonial from './testimonial/index'
import opportunity from './opportunity/index'



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
    master,
    content,
    course,
    team,
    event,
    testimonial,
    opportunity,
  }
})
