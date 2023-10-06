<template>
  <AppForm class="form" @submit.prevent="create">
    <AppLabel
      :showError="v$.task.description.$invalid"
      :errorMessage="'Минимум 10 символов'"
    >
      <textarea
        class="form__textarea"
        :class="{
          input_error: v$.task.description.$invalid,
          input_valid: !v$.task.description.$invalid,
        }"
        @input="getValueTextarea(($event.target as HTMLInputElement).value)"
        placeholder="ВВедите текст задачи"
      ></textarea>
    </AppLabel>
    <AppLabel
      :showError="v$.task.deadlineDate.$invalid"
      :errorMessage="'Дата обязательна к заполнению'"
    >
      <div class="form__container">
        <AppInput
          class="form__input"
          type="date"
          v-model="task.deadlineDate"
          :class="{
            input_error: v$.task.deadlineDate.$invalid,
            input_valid: !v$.task.deadlineDate.$invalid,
          }"
        />
        <AppInput class="form__input" type="time" v-model="task.deadlineTime" />
      </div>
    </AppLabel>
    <AppButton
      class="form__button"
      :class="v$.task.$invalid ? 'disabled' : ''"
      :disabled="v$.task.$invalid"
      >Создать задачу
    </AppButton>
  </AppForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import Task from "../types/Task";
import TaskState from "../types/TaskState";

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  data(): TaskState {
    return {
      task: {
        description: "",
        deadlineDate: "",
        deadlineTime: "",
      },
    };
  },
  validations() {
    return {
      task: {
        description: { minLength: minLength(10), required },
        deadlineDate: { required },
      },
    };
  },

  methods: {
    getValueTextarea(value: string): string {
      return (this.task.description = value);
    },
    create() {
      if (!this.task.deadlineTime) {
        this.task.deadlineTime = "23:59";
      }
      this.$emit("createTask", {
        id: String(Date.now()),
        description: this.task.description,
        deadline: String(
          new Date(
            `${this.task.deadlineDate} ${this.task.deadlineTime}`,
          ).getTime() / 1000,
        ),
        completed: false,
        completedDate: "",
        comment: "",
      });
      this.task = {
        description: "",
        deadlineDate: "",
        deadlineTime: "",
      };
    },
  },

  emits: {
    createTask: (task: Task) => task,
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
