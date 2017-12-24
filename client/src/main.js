import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';
import axios from './axios';
import VueAxios from 'vue-axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import { sync } from 'vuex-router-sync';



Vue.use(Vuex);
Vue.use(iView);
Vue.use(VueAxios, axios)


sync(store, router)
Vue.config.productionTip = false;


new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
