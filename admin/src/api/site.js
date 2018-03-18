import Vue from 'vue'

export default {

  getInfo (id) {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/site/' + id).then(response => {
        resolve(response.data)
      })
    })
  },

  update (id, data) {
    return new Promise((resolve, reject) => {
      Vue.axios.put('/site/' + id, data).then(response => {
        resolve(response.data)
      })
    })
  }
}
