import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import CKEditor from '@ckeditor/ckeditor5-vue';
import can from './helpers/can';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueAnimateNumber from 'vue-animate-number'
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps';


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
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps,{
  load: {
    key: 'AIzaSyA3GAjb-b7Lsom70XXb5HBVVoKpfTxGrbI'
  },
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
