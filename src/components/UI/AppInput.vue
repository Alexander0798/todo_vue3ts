<template>
    <input :value="modelValue" @input="updateInput" type={{type}} class="input" >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
name: "AppInput",
props: {
    modelValue: [String, Number]
},
methods: {
    updateInput(evt: any) {
        this.$emit("update:modelValue", evt.target.value)
    }
}
})

</script>

<style lang="scss">

</style>