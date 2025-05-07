<template>
	<div class="not-found">
		<p class="not-found__text">{{ $t('errors.not_found_page') }}</p>
	</div>
</template>

<script>

export default {
	name: 'NotFound',
	components: {
	},
};
</script>

<style scoped lang="scss">
@use 'NotFound.scss';
</style>
