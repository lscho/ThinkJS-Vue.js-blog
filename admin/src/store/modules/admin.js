// initial state
const state = {
  menu: {
    // 是否折叠
    fold: localStorage.getItem('menu_fold') === 'true'
  },
  user: {
    // 用户名
    name: localStorage.getItem('user_name'),
    // 全部信息
    info: {}
  }
}

// getters
const getters = {

  getMenu: state => state.menu,
  getUser: state => state.user

}

// actions
const actions = {

}

// mutations
const mutations = {

  setMenuFlod (state, value) {
    localStorage.setItem('menu_fold', value)
    state.menu.fold = value ? 1 : 0
  },

  setUserName (state, value) {
    localStorage.setItem('user_name', value)
    state.user.name = value
  },

  setUserInfo (state, value) {
    state.user.info = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
