<template>
	<svg width="32" height="3" viewBox="0 0 32 3" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="31.7136" height="3" :fill="color" />
	</svg>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: '#203348',
		},
	},
};
</script>
