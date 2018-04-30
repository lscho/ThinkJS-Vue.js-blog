import Vue from 'vue'
export default {

  upload (data) {
  	console.log(data)
    return new Promise((resolve, reject) => {
      Vue.axios.post('/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
      	reject(error)
      })
    })
  }
}
