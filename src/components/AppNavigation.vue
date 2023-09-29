<template>
    <nav class="navigation">
        <AppButton tupe="button" class="navigation__button">Активные</AppButton>
        <AppButton tupe="button" class="navigation__button">Просроченые</AppButton>
        <AppButton tupe="button" class="navigation__button">На сегодня </AppButton>
        <AppButton tupe="button" class="navigation__button navigation__button-completed">Завершенные </AppButton>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})

</script>

<style lang="scss">
.navigation {
    display: flex;

    gap: 0 10px;

    &__button {}

    &__button-completed {
        justify-self: flex-end;
    }
}
</style>