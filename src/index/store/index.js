import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import application from './application/index'
import auth from './auth/index'
import loading from './loading/index'
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
import authorization from './authorization/index'
import jobs from './jobs/index'
import website from './website/index'
import slider from './slider/index'
import discount from './discount/index'
import service from './service/index'
import country from './country/index'
import facility from './facility/index'
import contact from './front/contact/index'
import website_detail from './front/website_detail/index'



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
    authorization,
    jobs,
    contact,
    loading,
    website,
    slider,
    discount,
    service,
    country,
    website_detail,
    facility,
    auth,
  }
})
