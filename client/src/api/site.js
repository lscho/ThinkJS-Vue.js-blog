import Vue from 'vue';

export default {

	getInfo(id) {
		return new Promise((resolve, reject) => {
			Vue.axios.get('/site/' + id).then(res => {
				resolve(res.data);
			});
		})
	},

	update(id, data) {
		return new Promise((resolve, reject) => {
			Vue.axios.put('/site/' + id, data).then(res => {
				resolve(res.data);
			});
		})
	}
}