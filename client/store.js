import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: null,
		loadOK: true
	},
	mutations: {
		saveToken(state, data) {
			state.token = data;
			window.localStorage.setItem("token", data);
		},
		removeToken(state) {
			state.token = null;
			window.localStorage.removeItem("token");
		},
		chgLoadOK(state) {
			if (state.loadOK) {
				state.loadOK = false;
			}
		},
		initLoadOK(state) {
			state.loadOK = true;
		}
	}
});

export default store;