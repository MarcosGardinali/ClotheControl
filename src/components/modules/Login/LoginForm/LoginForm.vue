<template>
    <div class="form">
        <InputGroup id="input_login" label="Login" placeholder="Insira seu login" type="text" @modelValue="login"/>
        <InputGroup id="input_senha" label="Senha" placeholder="Insira sua senha" type="password" hasIcon isPassword @modelValue="senha"/>
        <span class="span"><a href="#">Esqueci minha senha</a></span>
        <input class="submit" type="submit" value="Login" />
        <span class="span">Não tem uma conta? <a href="#">Cadastre-se</a></span>
        </div>
</template>
<script>
import InputGroup from '@/components/shared/InputGroup/InputGroup.vue';

export default {
    name: 'LoginForm',
	components: { InputGroup },
    data: () => ({
		login: null,
		senha: null,
	}),
	computed: {
	},
	created() {
		
	},
}
</script>
<style lang="scss" scoped>
@use 'LoginForm.scss';
</style>