import Vue from 'vue';
import router from './router';
import App from './app.vue';
import store from './store';
import globalComponents from '@/components/global';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/default.css' ;
import './icons';
import 'default-passive-events';
hljs.registerLanguage('javascript', javascript);

// md编辑器代码高亮
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block);
  });
});
Vue.use(hljs);

// 自定义全局组件
Vue.use(globalComponents);

// 系统错误捕获
const errorHandler = (error, vm)=>{
  console.error('抛出全局异常');
  console.error(vm);
  console.error(error);
};

// 统计代码
var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
 (function () {
       var hm = document.createElement('script');
       hm.src = 'https://js.users.51.la/20874891.js';
       var s = document.getElementsByTagName('script')[0];
       s.parentNode.insertBefore(hm, s);
  })();

Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error)=> errorHandler(error,this);

new Vue({
	el: '#app',
	router,
	store,

	render: h => {
		return h(App);
	}
});

