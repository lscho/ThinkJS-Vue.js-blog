import Vue from 'vue';

export default {
	create(data){
		data.type='tag';
		return new Promise((resolve, reject) => {
			Vue.axios.post('/meta',data).then(res=>{
				resolve(res.data);
			});
		})
	},

	getList(data,map={}){
		map.type='tag';
		return new Promise((resolve, reject) => {
			Vue.axios.get('/meta',{params:map}).then(res=>{
				resolve(res.data);
			});
		})
	},

	getInfo(id,map={}){
		map.type='tag';
		return new Promise((resolve, reject) => {
			Vue.axios.get('/meta/'+id,{params:map}).then(res=>{
				resolve(res.data);
			});
		})		
	},

	update(id,data){
		data.type='tag';
		return new Promise((resolve, reject) => {
			Vue.axios.put('/meta/'+id,data).then(res=>{
				resolve(res.data);
			});
		})
	},

	delete(id){
		return new Promise((resolve, reject) => {
			Vue.axios.delete('/meta/'+id).then(res=>{
				resolve(res.data);
			});
		})		
	}
}