import Vue from 'vue'

export default {

  getList (map = {}) {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/comment', { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },

  getInfo (slug) {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/comment/' + slug).then(response => {
        resolve(response.data)
      })
    })
  },

  update (id, data) {
    return new Promise((resolve, reject) => {
      Vue.axios.put('/comment/' + id, data).then(response => {
        resolve(response.data)
      })
    })
  },

  delete (id) {
    return new Promise((resolve, reject) => {
      Vue.axios.delete('/comment/' + id).then(response => {
        resolve(response.data)
      })
    })
  }
}
