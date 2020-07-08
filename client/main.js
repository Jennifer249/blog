import Vue from 'vue';
import router from './router';
import App from './app.vue';
import store from './store';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import hljs from 'highlight.js' ;
import 'highlight.js/styles/default.css' ;
import './icons';
import 'default-passive-events'

Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
});

Vue.use(hljs);
Vue.component('chart', ECharts);

router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

new Vue({
	el: '#app',
	router,
	store,

	render: h => {
		return h(App)
	}
});

