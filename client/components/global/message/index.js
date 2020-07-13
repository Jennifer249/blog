import Vue from 'vue';
import message from './message.vue';

const DEFAULTS = {
	show: false,
	text: '',
	duration: 3000,
	type: 'info'
}

//创建构造器
const messageConstructor = Vue.extend(message);

message.init = (options) => {
	if(typeof options === 'string' || typeof options === 'number') {
		options = {
			text: options
		}
	}

	options = Object.assign({}, DEFAULTS, options);

	//创建实例
	let instance = new messageConstructor({
		data: options
	}).$mount();

	//挂载实例
	document.body.appendChild(instance.$el);

	//显示消息框
	Vue.nextTick(() => {
		instance.show = true;
	})
};

export default message;