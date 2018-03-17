// initial state
const state = {
  value: localStorage.getItem('token')
}

// getters
const getters = {

  getToken: state => state.value,

  verifyToken: state => {
    if (!state.value) {
      return false
    }

    return true
  }
}

// actions
const actions = {

}

// mutations
const mutations = {

  setToken (state, value) {
    localStorage.setItem('token', value)
    state.value = value
  },

  clearToken (state, value) {
    localStorage.removeItem('token')
    state.value = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
