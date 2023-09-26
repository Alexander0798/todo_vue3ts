<template>
    <div class="menu">
        <AppButton class="menu__button-add">Добавить задачу</AppButton>
        <div class="menu__container">
            <AppButton class="menu__button-login--up">Зарегистрироваться</AppButton>
            <AppButton class="menu__button-login--in">Войти</AppButton>
        </div>
    </div>
</template>
<script lang="ts">
export default {}
</script>
<style lang="scss">
.menu {
    display: flex;
    justify-content: space-between;
&__button-add {
}

&__container {
    display: flex;
    gap: 0 10px
}
}



</style>