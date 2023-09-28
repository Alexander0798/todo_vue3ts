<template>
    <div class="menu">
        <AppButton class="menu__button-add" @click="showPopupAddTask">Добавить задачу
        </AppButton>
        <div class="menu__container">
            <AppButton class="menu__button-sign--up" @click="showPopupSignUp">
                Зарегистрироваться</AppButton>
            <AppButton class="menu__button-sign--in" @click="showPopupSignIn">Войти</AppButton>
        </div>
    </div>
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
.menu {
    display: flex;
    justify-content: space-between;

    &__button-add {}

    &__container {
        display: flex;
        gap: 0 10px
    }
}
</style>