<template>
	<svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M11.5 11V5H13.5V11H19.5V13H13.5V19H11.5V13H5.5V11H11.5Z" :fill="color" />
	</svg>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: '#FFF',
		},
	},
};
</script>
