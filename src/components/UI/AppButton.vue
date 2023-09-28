

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "AppButton"
})


</script>
<style scoped>
.button {

}
.disabled {
  cursor: not-allowed;
  border: 1px solid #cccc;
  background-color: #cccc;
}
</style>
