import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router';
import store from './store';

// scss style
import './assets/scss/index.scss';
// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.config.productionTip = false;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Vuelidate
Vue.use(Vuelidate);

// axios
Vue.prototype.$axios = axios;
Vue.use(VueAxios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
