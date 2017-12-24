import Vue from 'vue';

export default {
	getInfo(userName){
		return new Promise((resolve, reject) => {
			Vue.axios.get('/user/'+userName).then(res=>{
				resolve(res.data);
			});
		})		
	},

	update(userName,data){
		return new Promise((resolve, reject) => {
			Vue.axios.put('/user/'+userName,data).then(res=>{
				resolve(res.data);
			});
		})
	}
}