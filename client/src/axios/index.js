import axios from 'axios';
import { Message , LoadingBar } from 'iview';
import store from '@/store';
import router from '@/router'

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 5000;

// http请求拦截器
axios.interceptors.request.use(config => {
	// 进度条开始
	LoadingBar.start();
	//token
	if (localStorage.getItem('token')) {
		config.headers.Authorization = localStorage.getItem('token')
	}
	return config;
}, error => {
	LoadingBar.error();
	Message.error('请求服务器超时');
	return error;
})

// http响应拦截器
axios.interceptors.response.use(data => {
	if (!data || typeof data.data != 'object') {
		console.log(data);
		LoadingBar.error();
		Message.error('服务器响应格式错误');
	} else {
		let errmsg = "";
		const errno = data.data.errno;
		switch (errno) {
			case 1001:
				//数据检验未通过
				for (let i in data.data.data) {
					errmsg += data.data.data[i] + ";";
				}
				break;
			default:
				errmsg = data.data.errmsg;
				break;
		}
		if (errmsg != "" && errno != 0) {
			Message.error(errmsg);
		}
		if (errmsg != "" && errno == 0) {
			Message.success(errmsg);
		}
	}
    LoadingBar.finish();
	return data;
}, error => {
	let errmsg = "服务器响应错误";
	if (error.response) {
		switch (error.response.status) {
			case 401:
				errmsg = "请登录后操作";
				store.commit("clearToken");
				router.replace("/login");
				break;
		}
	}
    LoadingBar.error();
	Message.error(errmsg);
	return Promise.reject(error.response.data)
})
export default axios