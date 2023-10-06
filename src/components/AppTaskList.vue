<template>
  <ul class="task__list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss">
.task {
  &__list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 20px 0;
  }
}
</style>
