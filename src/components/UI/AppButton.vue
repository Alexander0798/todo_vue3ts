<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppButton",
});
</script>
<style lang="scss">
.button {
  min-width: 40px;
  min-height: 20px;
  border: 1px solid rebeccapurple;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  box-shadow: 0.5px 0.5px 8px 0.5px rgba(0, 0, 0, 0.24);
  transition: 0.3s all;

  &:active {
    transform: scale(0.98);
    opacity: 1;
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);

  }

  &:disabled {
    cursor: not-allowed;
    border: 1px solid #cccc;
    background-color: #cccc;
  }

  &:hover {
    opacity: 0.8;
  }

}
</style>
