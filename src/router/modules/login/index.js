import Login from '@/views/modules/Login/Login.vue';
import ForgotPassword from '@/views/modules/ForgotPassword/ForgotPassword.vue';

export const loginRoutes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/forgot',
		name: 'ForgotPassword',
		component: ForgotPassword,
	},
];
