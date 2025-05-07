import Dashboard from '@/views/modules/Dashboard/Dashboard.vue';

export const dashboardRoutes = [
	{
		path: '/main/dashboard',
		name: 'dashboard',
		headerLabel: 'header.dashboard',
		menuLabel: 'sidebar.dashboard',
		component: Dashboard,
		showOnMenu: true,
	},
];
