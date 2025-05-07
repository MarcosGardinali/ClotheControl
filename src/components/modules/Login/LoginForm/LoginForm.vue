<template>
    <div class="form">
        <span class="input-span">
            <label for="email" class="label">Email</label>
            <input type="email" name="email" id="email" /></span>
        <span class="input-span">
            <label for="password" class="label">Password</label>
            <input type="password" name="password" id="password" /></span>
        <span class="span"><a href="#">Forgot password?</a></span>
        <input class="submit" type="submit" value="Log in" />
        <span class="span">Don't have an account? <a href="#">Sign up</a></span>
        </div>
</template>
<script>
export default {
    name: 'LoginForm',
	components: {  },
	computed: {
	},
	created() {
		
	},
}
</script>
<style lang="scss">
@use 'LoginForm.scss';
</style>