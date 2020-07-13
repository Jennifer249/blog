import Vue from 'vue';
import router from './router';
import App from './app.vue';
import store from './store';
import hljs from 'highlight.js' ;
import globalComponents from '@/components/global';
import 'highlight.js/styles/default.css' ;
import './icons';
import 'default-passive-events';

//md编辑器代码高亮
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
});
Vue.use(hljs);

//自定义全局组件
Vue.use(globalComponents);

//系统错误捕获
const errorHandler = (error, vm)=>{
  console.error('抛出全局异常');
  console.error(vm);
  console.error(error);
   
}
 
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error)=> errorHandler(error,this);

new Vue({
	el: '#app',
	router,
	store,

	render: h => {
		return h(App)
	}
});

