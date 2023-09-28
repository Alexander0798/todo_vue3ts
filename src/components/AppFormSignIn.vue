<template>
    <AppForm name="sign-in" @submit.prevent="create">
        <AppInputContainer>
            <AppInput class="form__input" type="email" placeholder="Введите email" v-model="user.email" /><span
                class="form_error">Не корректный Email</span>
        </AppInputContainer>
        <AppInputContainer>
            <AppInput class="form__input" type="password" placeholder="Введите пароль" v-model="user.password" /><span
                class="form_error">Минимальная длина пароля 5 символов</span>
        </AppInputContainer>

        <AppButton class="form__button" :class="!formValid() ? 'disabled' : ''" :disabled="!formValid()">Войти</AppButton>
    </AppForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignIn from "../types/SignIn"
export default defineComponent({
    data(): SignIn {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        formValid(): Boolean {
            const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            if (EMAIL_REGEXP.test(String(this.user.email)) && this.user.password.length > 5) {
                return true
            }
            return false
        },
        create() {
            this.$emit('signIn', { user: { ...this.user } })
        }
    },
    emits: {
        signIn: (user: SignIn) => user
    }
})

</script>

<style lang="scss"></style>