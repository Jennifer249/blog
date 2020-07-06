import axios from 'axios';
import store from '../store';
import router from '@/router'

let base = 'http://127.0.0.1:3000';

// //请求超时
axios.default.timeout = 20000;
//请求路径
axios.defaults.baseURL = 'http://localhost:3000'

//请求拦截
axios.interceptors.request.use(
	res => {

		if(res.url.match(/\/api\/admin/)) {
			res.headers.authorization = 'Bearer '+ window.localStorage.token;
		}
		console.log(res);
		return res;
	},
	err => {
		
		return Promise.reject(err);
	}
);

//响应拦截
axios.interceptors.response.use(
	res => {
		return res;
	},
	err => {
		if (err.response.status === 401) {
			store.commit("saveToken", "");
    		window.localStorage.removeItem('user');
    		return router.push({name: 'login'});

	    } else {
	     	//输出其他错误信息
	     	console.log(err);
	    }
		return Promise.reject(err);
	}
);

//获取登陆token
export const requestLogin = params => {
	return axios.post(`${base}/api/login/`, params).then(res => res.data);
}

//获取用户信息
export const requestUserInfo = () => {
	return axios.get(`${base}/api/admin/userInfo`).then(res => res.data);
}

//图表模块。获取统计数据和图表数据
export const requestDataCount = () => {
	return axios.get(`${base}/api/admin/back_home/data_count`).then(res => res.data);
}
export const requestChartVisits = () => {
	return axios.get(`${base}/api/admin/back_home/chart_visits`).then(res => res.data);
}
export const requestChartComments = () => {
	return axios.get(`${base}/api/admin/back_home/chart_comments`).then(res => res.data);
}

//文章管理模块
export const requestStatArticle = () => {
	return axios.get(`${base}/api/admin/article_mgt/stat_article`).then(res => res.data);
}
export const requestOldestYear = () => {
	return axios.get(`${base}/api/admin/article_mgt/oldest_year`).then(res => res.data);
}
export const changeArticeState = params => {
	return axios.post(`${base}/api/admin/article_mgt/update_article_state`, params).then(res => res.data);
}
export const delArticle = params => {
	return axios.delete(`${base}/api/admin/article_mgt/del`, params).then(res => res.data);
}
export const getArticle = params => {
	return axios.get(`${base}/api/share/get_article`, params).then(res => res.data);
}
export const requestSearchResult = params => {
	return axios.get(`${base}/api/admin/article_mgt/search_result`, params).then(res => res.data);
}

//评论管理模块
export const delComment = params => {
	return axios.delete(`${base}/api/admin/comment_mgt/del`, params).then(res => res.data);
}

//专栏管理模块
export const updateCategories = params => {
	return axios.post(`${base}/api/admin/categories/update`, params).then(res => res.data);
}
export const delCategories = params => {
	return axios.delete(`${base}/api/admin/categories/del`, params).then(res => res.data);
}
export const addCategories = params => {
	return axios.post(`${base}/api/admin/categories/add`, params).then(res => res.data);
}

//子专栏管理模块
export const getSubCategories = params => {
	return axios.get(`${base}/api/admin/sub_categories/list`, params).then(res => res.data);
}
export const moveArticles = params => {
	return axios.post(`${base}/api/admin/sub_categories/move`, params).then(res => res.data);
}
export const delArticles = params => {
	return axios.delete(`${base}/api/admin/sub_categories/del`, params).then(res => res.data);
}

//写文章模块
export const uploadFile = (params, config) => {
	return axios.post(`${base}/api/admin/edit/upload`, params, config).then(res => res.data);
}
export const saveArticle = params => {
	return axios.post(`${base}/api/admin/edit/add`, params).then(res => res.data);
}

//前台
//首页
export const getArticleSum = (params) => {
	return axios.get(`${base}/api/front/get_article_sum`, params).then(res => res.data);
}
//文章详情模块
export const getPreId = (params) => {
	return axios.get(`${base}/api/front/get_pre_id`, params).then(res => res.data);
}
export const getNextId = (params) => {
	return axios.get(`${base}/api/front/get_next_id`, params).then(res => res.data);
}

//留言模块
export const submitMessageBoard = (params) => {
	return axios.post(`${base}/api/front/submit_message_board`, params).then(res => res.data);
}
export const sendEmail = (params) => {
	return axios.post(`${base}/api/front/send_email`, params).then(res => res.data);
}

//前后台系统,都会用到
export const requestCategories = () => {
	return axios.get(`${base}/api/share/categoreis`).then(res => res.data);
}
export const getPageArticle = params => {
	return axios.get(`${base}/api/share/page_aritcle`, params).then(res => res.data);
}
export const getCommentList = (params) => {
	return axios.get(`${base}/api/share/comment_list`, params).then(res => res.data);
}
export const sendReply = params => {
	return axios.post(`${base}/api/share/save_reply`, params).then(res => res.data);
}