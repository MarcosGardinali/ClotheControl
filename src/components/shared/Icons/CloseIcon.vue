<template>
	<svg
		:width="size"
		:height="size"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12 9.77813L19.7781 2L22 4.22187L14.2219 12L22 19.7781L19.7781 22L12 14.2219L4.22187 22L2 19.7781L9.77813 12L2 4.22187L4.22187 2L12 9.77813Z"
			:fill="color"
		/>
	</svg>
</template>

<script>
export default {
	props: {
		size: {
			type: Number,
			default: 24,
		},
		color: {
			type: String,
			default: '#203348',
		},
	},
};
</script>
