<template>
	<svg :width="width" :height="height" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M2.828 6.00072L7.778 10.9507L6.364 12.3647L0 6.00072L6.364 -0.363281L7.778 1.05072L2.828 6.00072Z"
			:fill="color"
		/>
	</svg>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'var(--sidebarTextColor)',
		},
		width: {
			type: Number,
			default: 8,
		},
		height: {
			type: Number,
			default: 12,
		},
	},
};
</script>
