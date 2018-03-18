import Vue from 'vue'
export default {

  create (data) {
    data.type = 'category'
    return new Promise((resolve, reject) => {
      Vue.axios.post('/meta', data).then(response => {
        resolve(response.data)
      })
    })
  },

  getList (data, map = {}) {
    map.type = 'category'
    return new Promise((resolve, reject) => {
      Vue.axios.get('/meta', { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },

  getInfo (id, map = {}) {
    map.type = 'category'
    return new Promise((resolve, reject) => {
      Vue.axios.get('/meta/' + id, { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },

  update (id, data) {
    data.type = 'category'
    return new Promise((resolve, reject) => {
      Vue.axios.put('/meta/' + id, data).then(response => {
        resolve(response.data)
      })
    })
  },

  delete (id) {
    return new Promise((resolve, reject) => {
      Vue.axios.delete('/meta/' + id).then(response => {
        resolve(response.data)
      })
    })
  }
}
