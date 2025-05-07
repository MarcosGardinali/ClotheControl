<template>
	<div id="login" class="login">
		<div class="login-container">
			<div class="login-container__form">
				<LoginForm />
			</div>
			<div class="login-container__banner">
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'pinia';
import LoginForm from '@/components/modules/Login/LoginForm/LoginForm.vue';

export default {
	name: 'Login',
	components: {LoginForm,  },
	computed: {
	},
	created() {
		
	},
};
</script>

<style lang="scss">
@use 'Login.scss';
</style>
