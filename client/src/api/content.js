import Vue from 'vue';

export default {
	
	create(data) {
		return new Promise((resolve, reject) => {
			Vue.axios.post('/content', data).then(res => {
				resolve(res.data);
			});
		})
	},

	getList(map={}) {
		map.type=map.type||"default";
		return new Promise((resolve, reject) => {
			Vue.axios.get('/content',{ params: map }).then(res => {
				resolve(res.data);
			});
		})
	},

	getInfo(slug) {
		return new Promise((resolve, reject) => {
			Vue.axios.get('/content/' + slug).then(res => {
				resolve(res.data);
			});
		})
	},

	update(id, data) {
		return new Promise((resolve, reject) => {
			Vue.axios.put('/content/' + id, data).then(res => {
				resolve(res.data);
			});
		})
	},

	delete(id) {
		return new Promise((resolve, reject) => {
			Vue.axios.delete('/content/' + id).then(res => {
				resolve(res.data);
			});
		})
	}
}