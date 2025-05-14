<template>
    <div class="input-group">
        <label
            class="input-group__label"
            :class="[{ required: isRequired || !isEmailValid || hasError }]"
            :for="id"
        >
            {{ label }}
        </label>
        <div :class="[{ 'input-group__icon': hasIcon }]">
            <input
                v-if="mask"
                :id="id"
                v-mask="mask"
                class="input-group__input"
                :class="[{ required: isRequired || !isEmailValid || hasError, white: variant === 'white' }]"
                :type="!isPassword ? type : passwordType"
                :placeholder="placeholder"
                :value="modelValue"
                :disabled="disabled"
                autocomplete="off"
                @input="emitValue($event.target.value)"
            />
            <input
                v-else-if="money"
                :id="id"
                v-model.lazy="moneyValue"
                v-money3="config"
                class="input-group__input"
                :class="[
                    {
                        required: isRequired || !isEmailValid || hasError,
                        white: variant === 'white',
                    },
                ]"
                :type="!isPassword ? type : passwordType"
                :placeholder="placeholder"
                autocomplete="off"
                :disabled="disabled"
            />
            <input
                v-else
                :id="id"
                :ref="id"
                :max="max"
                :min="min"
                :maxlength="maxlength"
                class="input-group__input"
                :class="[
                    {
                        required: isRequired || !isEmailValid || invalidEmailFormat || hasError,
                        white: variant === 'white',
                    },
                ]"
                :type="!isPassword ? type : passwordType"
                :placeholder="placeholder"
                :value="modelValue"
                autocomplete="new-password"
                :disabled="disabled"
                @input="emitValue($event.target.value)"
                @blur="emitBlur"
                @change="emitSubmit"
            />
            <div v-if="hasIcon" class="input-group__input--icon" @click="handleShowPassword">
                <EyeClosedIcon
                    v-if="isPassword && passwordType === 'password'"
                    :color="isRequired ? '#fa0303' : '#203348'"
                />
                <EyeOpenedIcon
                    v-if="isPassword && passwordType === 'text'"
                    :color="isRequired ? '#fa0303' : '#203348'"
                />
            </div>
        </div>
        <span v-if="hasError" class="input-group__info-message">{{ $t('errors.required_field') }}</span>
        <span v-else-if="invalidEmailFormat" class="input-group__info-message">{{
            $t('errors.valid_email')
        }}</span>
    </div>
</template>
 
<script>
import { mask } from 'vue-the-mask';
//import { Money3Directive } from 'v-money3';
 
import EyeClosedIcon from '@/components/shared/Icons/EyeClosedIcon.vue';
import EyeOpenedIcon from '@/components/shared/Icons/EyeOpenedIcon.vue';
import { isEmailValid } from '@/utils/validate/email';
 
export default {
    name: 'InputGroup',
    components: {
        EyeClosedIcon,
        EyeOpenedIcon,
    },
    directives: {
        //mask,
        //money3: Money3Directive,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        isPassword: {
            type: Boolean,
            default: false,
        },
        hasIcon: {
            type: Boolean,
            default: false,
        },
        isEmailValid: {
            default: true,
            type: Boolean,
        },
        isRequired: {
            default: false,
            type: Boolean,
        },
        modelValue: {
            required: true,
            type: null,
        },
        variant: {
            type: String,
            default: 'default',
        },
        mask: {
            type: String,
            default: '',
        },
        money: {
            type: Boolean,
            default: false,
        },
        removeSpecialChars: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        max: {
            type: Number,
            default: Number.MAX_VALUE,
            required: false,
        },
        min: {
            type: Number,
            default: null,
            required: false,
        },
        maxlength: {
            type: Number,
            default: 1000,
            required: false,
        },
        hasError: {
            type: Boolean,
            default: false,
        },
        isRate: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue', 'blur', 'submit'],
    data: () => ({
        passwordType: 'password',
        moneyValue: 0,
        invalidEmailFormat: false,
    }),
    computed: {
        config() {
            return {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: '',
                precision: 2,
                disableNegative: true,
                masked: false /* doesn't work with directive */,
            };
        },
    },
    watch: {
        moneyValue(newValue) {
            this.$emit('update:modelValue', newValue);
        },
    },
    methods: {
        handleShowPassword() {
            if (!this.isPassword) return;
 
            this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
        },
        emitValue(newValue) {
            if (this.removeSpecialChars) {
                let removeChars = newValue.replace(/[^0-9.,-]/g, '');
                removeChars = removeChars.replace(/[^-]-/g, '');
 
                this.$nextTick(() => {
                    this.$refs[this.id].value = removeChars;
                });
 
                return this.$emit('update:modelValue', removeChars);
            }
 
            this.$emit('update:modelValue', newValue);
        },
        emitBlur(event) {
            if (this.type === 'email') {
                this.invalidEmailFormat = !isEmailValid(event.target.value);
            }
            this.$emit('blur');
        },
        emitSubmit(){
            this.$emit('submit')
        },
        loadMoneyValue(value) {
            const moneyValue = parseFloat(value)
            this.moneyValue = this.isRate ? moneyValue.toFixed(2) : value;
        },
    },
};
</script>
 
<style lang="scss" scoped>
@import 'InputGroup.scss';
</style>