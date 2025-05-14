<template>
	<svg
		:width="size"
		:height="size"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="7.72727" cy="8.27219" r="7.72727" :fill="color" />
		<g clip-path="url(#clip0_2464_44390)">
			<path
				d="M8.16415 7.32046L11.1194 4.36523L11.9636 5.20941L9.00833 8.16464L11.9636 11.1199L11.1194 11.964L8.16415 9.00882L5.20893 11.964L4.36475 11.1199L7.31997 8.16464L4.36475 5.20941L5.20893 4.36523L8.16415 7.32046Z"
				fill="white"
			/>
		</g>
		<defs>
			<clipPath id="clip0_2464_44390">
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
			default: '#FA0303',
		},
	},
};
</script>
