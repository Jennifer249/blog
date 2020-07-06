import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: null
	},
	mutations: {
		saveToken(state, data) {
			state.token = data;
			window.localStorage.setItem("token", data);
		}
	}
});

export default store;