import Vue from 'vue'
import Vuex from 'vuex'

import token from './modules/token'
import admin from './modules/admin'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const actions = {}
const getters = {}
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    token,
    admin
  },
  strict: debug
})
