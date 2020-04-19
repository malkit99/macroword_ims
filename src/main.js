import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import CKEditor from '@ckeditor/ckeditor5-vue';
import can from './helpers/can';

import axios from 'axios'



axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/'
Vue.config.productionTip = false
Vue.prototype.$can = can;
Vue.use( CKEditor );

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
