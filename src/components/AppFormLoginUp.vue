<template>
    <form class="form" name="login-up" @submit.prevent="create">
        <AppInput class="form__name" type="text" v-model="newUser.name"/>
        <AppInput class="form__login" type="text" v-model="newUser.login"/>
        <AppInput class="form__password" type="password" v-model="newUser.password"/>
        <appButton >Зарегистрироваться</appButton>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NewUserState from '../types/NewUserState'
import NewUser from '../types/NewUser'
export default defineComponent({
    data(): NewUserState {
        return {
            newUser: {
                name: '',
                login: '',
                password: ''
            }
        }
    },
    methods: {
        create() {
            this.$emit('createNewUser', {
                id: Date.now(),
                ...this.newUser
            })
            this.newUser = {
                name: '',
                login: '',
                password: ''
            }
        }
    },
    emits: {
        createNewUser: (newUser: NewUser) => newUser
    }
})

</script>

<style lang="scss">

</style>