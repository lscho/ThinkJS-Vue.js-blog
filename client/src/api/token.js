import Vue from 'vue';

export default {
	create(userInfo){
		return new Promise((resolve, reject) => {
			Vue.axios.post('/token',userInfo).then(res=>{
				resolve(res.data);
			});
		})
	}
}