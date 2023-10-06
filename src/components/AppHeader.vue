<template>
    <header class="header">
        <AppButton class="header__button-add" v-if="user" @click="showPopupAddTask">Добавить задачу
        </AppButton>
        <h1 class="header__title">Супер Задачи</h1>
        <div class="header__container" v-if="!user">
            <AppButton class="header__button-sign--up" @click="showPopupSignUp">
                Зарегистрироваться</AppButton>
            <AppButton class="header__button-sign--in" @click="showPopupSignIn">Войти</AppButton>
        </div>
        <div class="header__container" v-else>
            <h2 class="header__subtitle">{{ user.name }}</h2>
            <AppButton class="header__button-exit" @click="exitUser">Выйти</AppButton>
        </div>
    </header>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue'
import User from '../types/User'

export default defineComponent({
    props: {
        user: {
            type: null as unknown as PropType<User | null>,
            default: null,
            required: true
        }
    },
    methods: {
        showPopupAddTask() {
            this.$emit("showPopupAddTask", true)
        },
        showPopupSignUp() {
            this.$emit("showPopupSignUp", true)
        },
        showPopupSignIn() {
            this.$emit("showPopupSignIn", true)
        },
        exitUser() {
            this.$emit('exitUser')
        }
    },

})
</script>
<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    &__title {
        margin: 0;
        font-size: 32px;
    }

    &__button-add {}

    &__container {
        display: flex;
        gap: 0 20px;
        align-items: center;
    }
}
</style>