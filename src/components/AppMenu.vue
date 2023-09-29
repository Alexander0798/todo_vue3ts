<template>
    <header class="header">
        <AppButton class="header__button-add" @click="showPopupAddTask">Добавить задачу
        </AppButton>
        <h1 class="header__title">Супер Задачи</h1>
        <div class="header__container">
            <AppButton class="header__button-sign--up" @click="showPopupSignUp">
                Зарегистрироваться</AppButton>
            <AppButton class="header__button-sign--in" @click="showPopupSignIn">Войти</AppButton>
        </div>
    </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        showPopupAddTask() {
            this.$emit("showPopupAddTask", true)
        },
        showPopupSignUp() {
            this.$emit("showPopupSignUp", true)
        },
        showPopupSignIn() {
            this.$emit("showPopupSignIn", true)
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
        gap: 0 10px
    }
}
</style>