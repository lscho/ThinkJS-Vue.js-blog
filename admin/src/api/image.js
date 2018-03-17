import Vue from 'vue'
console.log(11)
export default {

  upload (data) {
    return new Promise((resolve, reject) => {
      Vue.axios.post('/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        resolve(res.data)
      })
    })
  }
}
