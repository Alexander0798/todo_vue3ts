<template>
    <div class="popup" v-if="show" @click.stop="hidePopup">
        <div @click.stop class="popup__content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "AppPopup",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hidePopup() {
            this.$emit("update:show", false)
        }
    }
})

</script>

<style lang="scss">
.popup {
    display: flex;
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    
    &__content {
        margin: auto;
        background: white;
        border-radius: 20px;
        min-width: 320px;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>