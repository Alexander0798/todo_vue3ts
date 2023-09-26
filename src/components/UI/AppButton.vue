

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
  min-width: 40px;
  min-height: 20px;
  border: 1px solid rebeccapurple;
  border-radius: 20px;
  padding: 5px 10px;
}
</style>
