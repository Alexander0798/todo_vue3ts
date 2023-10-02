<template>
    <AppForm class="form" name="sign-up" @submit.prevent="create">
        <AppInput class="form__input" type="text" placeholder="Введите имя" v-model="newUser.name" />
        <AppInput class="form__input" type="email" placeholder="Введите email" v-model="newUser.email" />
        <AppInput class="form__input" type="password" placeholder="Введите пароль" autocomplete="on" v-model="newUser.password" />
        <appButton class="form__button" :class="!formValid() ? 'disabled' : ''"
            :disabled="!formValid()">Зарегистрироваться</appButton>
    </AppForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignUp from '../types/SignUp'
export default defineComponent({
    data(): SignUp {
        return {
            newUser: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        formValid(): Boolean {
            const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            if(this.newUser.name.length > 3 && EMAIL_REGEXP.test(String(this.newUser.email)) && this.newUser.password.length > 5) {
                return true
            } else {
                return false
            }
        },
        create() {
            this.$emit('signUp', {
                newUser: {
                    ...this.newUser
                }
            })
            this.newUser = {
                name: '',
                email: '',
                password: ''
            }
        }
        
    },
    emits: {
        signUp: (newUser: SignUp) => newUser
    }
})

</script>

<style lang="scss"></style>