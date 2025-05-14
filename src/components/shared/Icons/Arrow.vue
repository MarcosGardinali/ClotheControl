<template>
	<svg
		width="11"
		:style="directionStyle"
		height="10"
		viewBox="0 0 11 10"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M5.92441 9.49471C5.75685 9.49471 5.62103 9.35888 5.62103 9.19133L5.62103 1.30338C5.62103 1.13583 5.75686 1 5.92441 1C6.09196 1 6.22779 1.13583 6.22779 1.30338L6.22779 9.19133C6.22779 9.35888 6.09196 9.49471 5.92441 9.49471Z"
			:fill="color"
		/>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M3.58939 6.8526C3.70817 6.73442 3.90026 6.7349 4.01844 6.85367L5.92284 8.76757L7.83673 6.86317C7.95551 6.74499 8.1476 6.74547 8.26578 6.86424C8.38396 6.98302 8.38349 7.17511 8.26471 7.29329L6.13576 9.41167C6.01698 9.52986 5.82489 9.52938 5.70671 9.41061L3.58833 7.28165C3.47014 7.16288 3.47062 6.97079 3.58939 6.8526Z"
			:fill="color"
		/>
	</svg>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: '#FF4C41',
		},
		direction: {
			type: String,
			default: 'bottom',
		},
	},
	computed: {
		directionStyle() {
			const directions = {
				top: '180deg',
				bottom: '0deg',
				left: '90deg',
				right: '270deg',
			};

			return `transform: rotate(${directions[this.direction]});`;
		},
	},
};
</script>
