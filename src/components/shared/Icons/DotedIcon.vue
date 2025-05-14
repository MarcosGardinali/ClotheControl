<template>
	<svg
		:width="size"
		height="2"
		:viewBox="`0 0 ${size} 2`"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path :d="`M0 1L${size} 0.999994`" stroke="#203348" stroke-dasharray="2 2" />
	</svg>
</template>

<script>
export default {
	name: 'DotedIcon',
	props: {
		size: {
			type: [String, Number],
			default: 70,
		},
	},
};
</script>
