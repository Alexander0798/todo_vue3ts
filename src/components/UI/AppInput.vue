<template>
    <input :value="modelValue" @input="updateInput(($event.target as HTMLInputElement).value)" type={{type}} class="input" >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
name: "AppInput",
props: {
    modelValue: [String, Number]
},
methods: {
    updateInput(value: String) {
        this.$emit("update:modelValue", value)
    }
}
})

</script>

<style lang="scss">
 .input {
    outline: none;
    padding: 6px ;
 }
</style>