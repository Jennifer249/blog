import message from './message';
import dialog from './dialog';

const globalComponent = {
	install(Vue) {
		Vue.component('Dialog', dialog);
		Vue.prototype.$myMessage = message.init;
	}
};

export default globalComponent;