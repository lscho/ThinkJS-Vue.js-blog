import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import axios from './axios'
import VueAxios from 'vue-axios'
import { sync } from 'vuex-router-sync'

// 插件
Vue.use(Vuex)
Vue.use(VueAxios, axios)
sync(store, router)

// 配置
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
