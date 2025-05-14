<template>
    <svg style="margin-right: 6px; margin-bottom: 2px;" width="14" height="14" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
            cx="4"
            cy="4"
            r="4"
            :fill="color"
        />
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
