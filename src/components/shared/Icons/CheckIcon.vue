<template>
	<svg
		:width="size"
		:height="size"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="7.72727" cy="7.72727" r="7.72727" :fill="color" />
		<g clip-path="url(#clip0_2464_44377)">
			<path
				d="M6.96981 10.0567L12.4576 4.56836L13.3024 5.41254L6.96981 11.7451L3.17041 7.94567L4.01459 7.10149L6.96981 10.0567Z"
				fill="white"
			/>
		</g>
		<defs>
			<clipPath id="clip0_2464_44377">
				<rect width="14.3284" height="14.3284" fill="white" transform="translate(1 1)" />
			</clipPath>
		</defs>
	</svg>
</template>

<script>
export default {
	props: {
		size: {
			type: Number,
			default: 16,
		},
		color: {
			type: String,
			default: '#00A8DF',
		},
	},
};
</script>
