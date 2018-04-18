import Vue from 'vue'

export default {

  getList () {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/config').then(response => {
        resolve(response.data)
      })
    })
  },

  update (type, data) {
    return new Promise((resolve, reject) => {
      Vue.axios.put('/config/'+type, data).then(response => {
        resolve(response.data)
      })
    })
  }
}
