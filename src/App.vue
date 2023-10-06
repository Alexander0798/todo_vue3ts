<template>
  <AppHeader
    :user="user"
    @exitUser="exitUser"
    @showPopupSignUp="showPopupSignUp"
    @showPopupAddTask="showPopupAddTask"
    @showPopupSignIn="showPopupSignIn"
  />
  <AppPopup v-model:show="popupAddTask">
    <AppFormTaskAdd name="app-form-task-add" @createTask="addTask" />
  </AppPopup>
  <AppPopup v-model:show="popupSignUp">
    <AppFormSignUp name="app-form-sign-up" @signUp="signUp" />
  </AppPopup>
  <AppPopup v-model:show="popupSignIn">
    <AppFormSignIn name="app-form-sign-in" @signIn="signIn" />
  </AppPopup>
  <AppPopup v-model:show="popupEditTask">
    <AppFormTaskEdit
      name="app-form-task-edit"
      @editTask="editTask"
      v-bind:taskEdit="taskEdit"
    />
  </AppPopup>
  <AppFilter :filter="filter" @setFilter="setFilter" v-if="user" />
  <main class="main">
    <h2 class="main__title" v-if="!user">
      Необходимо войти в профиль или Зарегистрироваться
    </h2>
    <h2
      class="main__title"
      v-if="user && filter !== 'completed' && !taskFilter.length"
    >
      Нет активных задач
    </h2>
    <h2
      class="main__title"
      v-if="user && filter === 'completed' && !taskFilter.length"
    >
      Нет завершенных задач
    </h2>
    <div class="main__task task">
      <AppTaskList>
        <AppTaskItem
          v-if="filter !== 'completed'"
          v-for="task in taskFilter"
          :key="String(task.id)"
          :id="`${task.id}`"
          :task="task"
          @removeTask="removeTask"
          @showPopupEditTask="showPopupEditTask"
          @completedTask="completedTask"
          :overdue="filterTaskOverdue(Number(task.deadline))"
          :current="filterTaskCurrent(Number(task.deadline))"
        />
        <AppTaskCompletedItemVue
          v-else
          v-for="taskCompleted in taskFilter"
          :key="String(taskCompleted.id)"
          :id="`${taskCompleted.id}`"
          :taskCompleted="taskCompleted"
          @backTaskCompleted="backTaskCompleted"
        />
      </AppTaskList>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppHeader from "./components/AppHeader.vue";
import AppFormTaskAdd from "./components/AppFormTaskAdd.vue";
import AppFormSignUp from "./components/AppFormSignUp.vue";
import AppFormSignIn from "./components/AppFormSignIn.vue";
import AppTaskList from "./components/AppTaskList.vue";
import AppFormTaskEdit from "./components/AppFormTaskEdit.vue";
import AppFilter from "./components/AppFilter.vue";
import AppTaskItem from "./components/AppTaskItem.vue";
import AppTaskCompletedItemVue from "./components/AppTaskCompletedItem.vue";

import Task from "./types/Task";
import SignUp from "./types/SignUp";
import SignIn from "./types/SignIn";
import AppState from "./types/AppState";
import User from "./types/User";
import { Filter } from "./types/Filter";

export default defineComponent({
  data(): AppState {
    return {
      user: null,
      tasks: [],
      taskEdit: {
        description: "",
        deadline: "",
        comment: "",
        completed: false,
        completedDate: "",
        id: "",
      },
      popupEditTask: false,
      popupAddTask: false,
      popupSignUp: false,
      popupSignIn: false,
      filter: "active",
    };
  },
  components: {
    AppHeader,
    AppFormTaskAdd,
    AppFormSignUp,
    AppFormSignIn,
    AppTaskList,
    AppFormTaskEdit,
    AppFilter,
    AppTaskItem,
    AppTaskCompletedItemVue,
  },
  computed: {
    taskFilter(): Task[] {
      switch (this.filter) {
        case "overdue":
          return this.sort(
            this.tasks.filter((task) => {
              if (this.filterTaskOverdue(Number(task.deadline))) {
                return task;
              }
            }),
          );
        case "current":
          return this.sort(
            this.tasks.filter((task) => {
              return this.filterTaskCurrent(Number(task.deadline));
            }),
          );
        case "completed":
          return this.sort(this.tasks.filter((task) => task.completed));
        case "active":
        default:
          return this.sort(this.tasks.filter((task) => !task.completed));
      }
    },
  },
  methods: {
    filterTaskOverdue(dateUnix: number): boolean {
      const currentDateUnix: number = Date.now() / 1000;
      const result: number = currentDateUnix - dateUnix;
      if (result > 0) {
        return true;
      }
      return false;
    },
    filterTaskCurrent(dateUnix: number) {
      const currentDate: string = new Date().toDateString();
      const currentHour = new Date().getHours();
      const currentMinutes = new Date().getMinutes();
      const currentTimeUnix: number = currentHour * 3600 + currentMinutes * 60;
      const taskDate: string = new Date(dateUnix * 1000).toDateString();
      const taskHour: number = Number(
        new Date(dateUnix * 1000)
          .toLocaleString("en-GB")
          .split(", ")[1]
          .split(":")[0],
      );
      const taskMinutes: number = Number(
        new Date(dateUnix * 1000)
          .toLocaleString("en-GB")
          .split(", ")[1]
          .split(":")[1],
      );
      const taskTimeUnix: number = taskHour * 3600 + taskMinutes * 60;

      if (currentDate === taskDate && currentTimeUnix - taskTimeUnix < 0) {
        return true;
      }
      return false;
    },
    sort(tasks: Task[]): Task[] {
      return tasks.sort((a: Task, b: Task): any => {
        return Number(a.deadline) - Number(b.deadline);
      });
    },
    addTask(data: Task) {
      this.tasks.push(data);
      this.popupAddTask = false;
      this.setTask(data);
    },
    completedTask(data: Task) {
      this.removeTask(data.id);
      this.addTask(data);
      console.log(this.tasks);
    },
    backTaskCompleted(data: Task) {
      this.removeTask(data.id);
      data.completed = false;
      data.comment = "";
      data.completedDate = "";
      this.addTask(data);
    },
    editTask(data: Task) {
      this.removeTask(data.id);
      this.tasks.push(data);
      this.popupEditTask = false;
      this.pathTask(data);
    },
    removeTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.deleteTask(id);
    },
    signUp(data: SignUp) {
      const user: User = {
        name: data.newUser.name,
        id: String(Date.now()),
        token: String(Date.now()),
      };
      this.setCookie("user", user);
      this.user = user;
      this.popupSignUp = false;
    },
    signIn(data: SignIn) {
      console.log(data);
      this.popupSignIn = false;
    },
    // показ попапов

    showPopupAddTask() {
      this.popupAddTask = true;
    },
    showPopupSignUp() {
      this.popupSignUp = true;
    },
    showPopupSignIn() {
      this.popupSignIn = true;
    },
    showPopupEditTask(id: string) {
      const targetTask = JSON.parse(
        JSON.stringify(this.tasks.find((task) => task.id === id)),
      );
      this.taskEdit = { ...targetTask };
      this.popupEditTask = true;
    },
    setFilter(activeFilter: Filter) {
      this.filter = activeFilter;
    },

    // api
    getTask() {
      const tasks: Task[] = JSON.parse(this.$cookie.getCookie("tasks"));
      if (tasks) {
        this.tasks = tasks;
      }
    },
    setTask(task: Task) {
      this.removeCookie("tasks");
      this.setCookie("tasks", this.tasks);
      console.log(task);
    },
    removeCookie(key: string) {
      const targetCookie: Boolean = this.$cookie.isCookieAvailable(key);
      if (targetCookie) {
        this.$cookie.removeCookie(key);
      }
    },
    deleteTask(id: string) {
      this.removeCookie("tasks");
      this.setCookie("tasks", this.tasks);
      console.log(id);
    },
    pathTask(data: Task) {
      this.removeCookie("tasks");
      this.setCookie("tasks", this.tasks);
      console.log(data);
    },
    exitUser() {
      this.user = null;
      this.tasks = [];
      this.removeCookie("user");
      this.removeCookie("tasks");
      this.removeCookie("tasksCompleted");
    },
    setCookie(key: string, data: any) {
      this.$cookie.setCookie(key, JSON.stringify(data));
    },
  },
  async mounted() {
    const user: User = this.$cookie.getCookie("user");
    if (user) {
      this.user = user;
      this.getTask();
    }
  },
});
</script>

<style lang="scss">
.main {
  &__title {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
