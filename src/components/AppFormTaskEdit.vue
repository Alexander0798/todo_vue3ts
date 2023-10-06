<template>
  <AppForm class="form" @submit.prevent="edit">
    <AppLabel :showError="false" :errorMessage="'Задача не изменина'">
      <textarea
        class="form__textarea"
        @input="getValueTextarea(($event.target as HTMLInputElement).value)"
        >{{ task.description }}</textarea
      >
    </AppLabel>
    <AppLabel :showError="validity()" :errorMessage="'Задача не изменина'">
      <div class="form__container">
        <AppInput
          class="form__input"
          type="date"
          v-model="task.deadlineDate"
          :value="task.deadlineDate"
        />
        <AppInput
          class="form__input"
          type="time"
          v-model="task.deadlineTime"
          :value="task.deadlineTime"
        />
      </div>
    </AppLabel>
    <AppButton
      class="form__button"
      :class="{ disabled: validity() }"
      :disabled="validity()"
      >Изменить задачу
    </AppButton>
  </AppForm>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";

import Task from "../types/Task";
import TaskState from "../types/TaskState";

export default defineComponent({
  data(): TaskState {
    return {
      task: {
        description: this.taskEdit.description,
        deadlineDate: new Date(Number(this.taskEdit.deadline) * 1000)
          .toISOString()
          .split("T")[0],
        deadlineTime: new Date(Number(this.taskEdit.deadline) * 1000)
          .toLocaleString("en-GB")
          .split(", ")[1],
      },
    };
  },
  props: {
    taskEdit: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  methods: {
    validity(): boolean {
      const staticTask: string = JSON.stringify(this.taskEdit);
      const currentTask: string = JSON.stringify(this.getModifiedTask());
      console.log(staticTask);
      console.log(currentTask);
      if (staticTask === currentTask) {
        return true;
      }
      return false;
    },
    getModifiedTask(): Task {
      return {
        id: this.taskEdit.id,
        description: this.task.description,
        deadline: String(
          new Date(
            `${this.task.deadlineDate} ${this.task.deadlineTime}`,
          ).getTime() / 1000,
        ),
        completed: false,
        completedDate: "",
        comment: "",
      };
    },
    getValueTextarea(value: any): String {
      return (this.task.description = value);
    },
    edit() {
      this.$emit("editTask", this.getModifiedTask());
      this.task = {
        description: "",
        deadlineDate: "",
        deadlineTime: "",
      };
    },
  },

  emits: {
    editTask: (task: Task) => task,
  },
});
</script>

<style lang="scss">
.form {
  &__textarea {
    resize: none;
    min-height: 100px;
    outline: none;
  }

  &__container {
    display: flex;
    gap: 0 20px;
  }

  &__button {
  }
}
</style>
