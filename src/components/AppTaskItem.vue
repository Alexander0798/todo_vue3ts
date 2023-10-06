<template>
  <li
    class="task__item"
    :class="{ task__item_overdue: overdue, task__item_current: current }"
  >
    <p class="task__description">{{ task.description }}</p>
    <div class="task__container" v-if="!showTaskComment">
      <span class="task__deadline">{{
        `${new Date(Number(task.deadline) * 1000).toLocaleString("en-GB")}
                `
      }}</span>
      <AppButton class="task__button-complete" @click="showComment"
        >Выполнить</AppButton
      >
    </div>
    <div class="task__comment" v-else>
      <AppInput
        type="text"
        class="task__comment-input"
        v-model="taskComment"
        :value="taskComment"
      />
      <div class="task__comment-wrapper">
        <AppButton
          type="button"
          class="button task__comment-button"
          @click="hideComment"
          >Отменить</AppButton
        >
        <AppButton
          type="button"
          class="button task__comment-button"
          @click="completedTask"
          >Завершить задачу
        </AppButton>
      </div>
    </div>
    <button
      class="task__button task__button-remove"
      @click="removeTask"
    ></button>
    <button
      class="button task__button task__button-edit"
      @click="showPopupEditTask"
    ></button>
  </li>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Task from "../types/Task";

export default defineComponent({
  data() {
    return {
      showTaskComment: false,
      taskComment: "",
    };
  },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
    overdue: {
      type: Boolean,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    showComment() {
      this.showTaskComment = true;
    },
    hideComment() {
      this.taskComment = "";
      this.showTaskComment = false;
    },
    removeTask() {
      this.$emit("removeTask", this.task.id);
    },
    showPopupEditTask() {
      this.$emit("showPopupEditTask", this.task.id);
    },
    completedTask() {
      this.$emit("completedTask", {
        id: String(this.task.id),
        description: this.task.description,
        deadline: this.task.deadline,
        completed: true,
        comment: this.taskComment,
        completedDate: new Date().toLocaleString("en-GB"),
      });
    },
  },
  emits: {
    removeTask: (id: string) => String(id),
    showPopupEditTask: (id: string) => String(id),
    completedTask: (data: Task) => data,
  },
});
</script>

<style lang="scss">
.task {
  &__item {
    border: 1px solid rebeccapurple;
    padding: 10px;
    position: relative;
    &_overdue {
      border: 1px solid rgb(221, 2, 2);
    }

    &_current {
      border: 1px solid rgb(0, 165, 69);
    }
  }

  &__description {
    margin: 0 0 15px;
    max-width: 900px;
    padding-right: 80px;
    text-wrap: wrap;
    overflow: hidden;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__deadline {
    display: inline-block;
    padding-right: 10px;
  }

  &__button {
    outline: none;
    border: none;
    cursor: pointer;
  }

  &__comment {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
  }

  &__comment-input {
    display: block;
    min-height: 30px;
    border-radius: 20px;
    padding: 10px 15px !important;
    border: 1px solid #ccc;
  }

  &__comment-wrapper {
    align-self: flex-end;
    display: flex;
    gap: 0 10px;
  }

  &__comment-button {
  }

  &__button-remove {
    width: 15px;
    height: 15px;
    background: center / contain no-repeat url("../assets/remove.svg");
    opacity: 0.3;
    position: absolute;
    right: 10px;
    top: 10px;

    &:hover {
      opacity: 1;
    }
  }

  &__button-edit {
    width: 15px;
    height: 15px;
    background: center / contain no-repeat url("../assets/edit.svg");
    opacity: 0.3;
    position: absolute;
    right: 40px;
    top: 10px;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  .button {
  }

  &__button-complete {
  }
}
</style>
