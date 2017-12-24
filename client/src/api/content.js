import Vue from 'vue';

export default {
	create(data){
		return new Promise((resolve, reject) => {
			Vue.axios.post('/content',data).then(res=>{
				resolve(res.data);
			});
		})
	},

	getList(){
		return new Promise((resolve, reject) => {
			Vue.axios.get('/content').then(res=>{
				resolve(res.data);
			});
		})
	},

	getInfo(id){
		return new Promise((resolve, reject) => {
			Vue.axios.get('/content/'+id).then(res=>{
				resolve(res.data);
			});
		})		
	},

	update(id,data){
		return new Promise((resolve, reject) => {
			Vue.axios.put('/content/'+id,data).then(res=>{
				resolve(res.data);
			});
		})
	},

	delete(id){
		return new Promise((resolve, reject) => {
			Vue.axios.delete('/content/'+id).then(res=>{
				resolve(res.data);
			});
		})		
	}
}