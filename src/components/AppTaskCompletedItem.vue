<template>
  <li class="task__completed-item">
    <p class="task__completed-description">{{ taskCompleted.description }}</p>
    <p class="task__completed-comment">{{ taskCompleted.comment }}</p>
    <div class="task__completed-container">
      <span class="task__completed-deadline">{{
        `задача завершина
                ${taskCompleted.completedDate}`
      }}</span>
      <AppButton class="task__completed-back" @click="backTaskCompleted"
        >Отменить</AppButton
      >
    </div>
  </li>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Task from "../types/Task";

export default defineComponent({
  props: {
    taskCompleted: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  methods: {
    backTaskCompleted() {
      this.$emit("backTaskCompleted", this.taskCompleted);
    },
  },
  emits: {
    backTaskCompleted: (task: Task) => task,
  },
});
</script>

<style lang="scss">
.task {
  &__completed-item {
    border: 1px solid rebeccapurple;
    padding: 10px;
  }

  &__completed-description {
    margin: 0 0 15px;
    max-width: 900px;
    text-wrap: wrap;
    overflow: hidden;
  }

  &__completed-comment {
    padding-left: 20px;
    margin: 0 0 10px;
    font-size: 14px;
    opacity: 0.9;
  }

  &__completed-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__completed-deadline {
  }

  &__completed-back {
  }
}
</style>
