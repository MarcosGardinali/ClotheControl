import Toast, { POSITION, useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
	position: POSITION.TOP_RIGHT,
	filterBeforeCreate: (toast, toasts) => {
		const toastAlreadyCreated = toasts.map((t) => t.content).includes(toast.content);
		return !toastAlreadyCreated && toast;
	},
};

export default function useToastPlugin(app) {
	app.use(Toast, options);
	app.config.globalProperties.$toast = useToast();
}
