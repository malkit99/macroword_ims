import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import CKEditor from '@ckeditor/ckeditor5-vue';
import can from './helpers/can';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueAnimateNumber from 'vue-animate-number'
import VueTelInput from 'vue-tel-input'


// import style
import 'swiper/css/swiper.css'

import axios from 'axios'



axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/'
Vue.config.productionTip = false
Vue.prototype.$can = can;
Vue.use( CKEditor );
Vue.use(VueAnimateNumber);
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VueTelInput)



store.dispatch('auth/me').then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
