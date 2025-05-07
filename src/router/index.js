import { createRouter, createWebHistory } from 'vue-router';

import Structure from '@/views/Structure/Structure.vue';
import NotFound from '@/views/modules/NotFound/NotFound.vue';

import { dashboardRoutes } from './modules/dashboard';
import { loginRoutes } from './modules/login';

export const routes = [
	{
		path: '/main',
		name: 'Structure',
		component: Structure,
		children: [
			...dashboardRoutes,
			{
				path: '/404',
				component: NotFound,
				name: 'NotFound',
			},
		],
	},
	...loginRoutes,
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
