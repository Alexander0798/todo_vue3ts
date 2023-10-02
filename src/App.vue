
<template>
  <AppMenu @showPopupSignUp="showPopupSignUp" @showPopupAddTask="showPopupAddTask" @showPopupSignIn="showPopupSignIn" />
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
    <AppFormTaskEdit name="app-form-task-edit" @editTask="editTask" v-bind:taskEdit="taskEdit" />
  </AppPopup>
  <AppFilter :filter="filter" @setFilter="setFilter" />
  <AppTaskList>
    <AppTaskItem v-if="filter !== 'completed'" v-for="task in taskFilter" :key="String(task.id)" :id="`${task.id}`"
      :task="task" @removeTask="removeTask" @showPopupEditTask="showPopupEditTask" @completedTask="completedTask" />
    <AppTaskCompletedItemVue v-else v-for="taskCompleted in tasksCompleted" :key="String(taskCompleted.id)"
      :id="`${taskCompleted.id}`" :taskCompleted="taskCompleted" />
  </AppTaskList>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppMenu from "./components/AppMenu.vue"
import AppFormTaskAdd from "./components/AppFormTaskAdd.vue";
import AppFormSignUp from "./components/AppFormSignUp.vue"
import AppFormSignIn from "./components/AppFormSignIn.vue"
import AppTaskList from "./components/AppTaskList.vue";
import AppFormTaskEdit from "./components/AppFormTaskEdit.vue";
import AppFilter from './components/AppFilter.vue';
import AppTaskItem from './components/AppTaskItem.vue';
import AppTaskCompletedItemVue from './components/AppTaskCompletedItem.vue'
import Task from './types/Task'
import SignUp from './types/SignUp'
import SignIn from "./types/SignIn";
import AppState from "./types/AppState"
import { Filter } from './types/Filter';
import TaskCompleted from './types/TaskCompleted';
export default defineComponent({
  data(): AppState {
    return {
      tasks: [],
      tasksCompleted: [],
      taskEdit: {
        description: '',
        deadlineDate: '',
        deadlineTime: '',
        id: ''
      },
      popupEditTask: false,
      popupAddTask: false,
      popupSignUp: false,
      popupSignIn: false,
      filter: "active",
    }
  },
  components: { AppMenu, AppFormTaskAdd, AppFormSignUp, AppFormSignIn, AppTaskList, AppFormTaskEdit, AppFilter, AppTaskItem, AppTaskCompletedItemVue },
  computed: {
    taskFilter(): Task[] {
      const currentDate = new Date()
      const currentTime = currentDate.getHours() * 1000 + currentDate.getMinutes() * 1000
      const currentTimeUnix = Date.now() / 1000
      switch (this.filter) {
        case "overdue":
          return this.tasks.filter(task => {
            const date = Date.parse(`${task.deadlineDate}T${task.deadlineTime}`) / 1000
            const overdue = date - currentTimeUnix
            if (overdue < 0) {
              return task
            }
          })
        case "current":
          return this.tasks.filter(task => {
            if (currentDate.toDateString() === new Date(String(task.deadlineDate)).toDateString() &&
              (Boolean(currentTime - ((Number(task.deadlineTime.split(':')[0])) * 1000) + (Number(task.deadlineTime.split(':')[1]) * 1000)))) {
              return task
            }
          })
        case "active":
        default:
          return this.tasks
      }
    }
  },
  methods: {
    addTask(task: Task) {
      console.log(task)
      this.tasks.push(task)
      this.popupAddTask = false
    },
    editTask(task: Task) {
      this.removeTask(task.id)
      this.tasks.push(task)
      this.popupEditTask = false
    },
    removeTask(id: String) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },
    signUp(newUser: SignUp) {
      console.log(newUser)
      this.$cookie.setCookie('user', JSON.stringify(newUser));
      this.popupSignUp = false
      console.log(this.$cookie.getCookie('user'))
    },
    signIn(user: SignIn) {
      console.log(user)
      this.popupSignIn = false
    },
    showPopupAddTask() {
      this.popupAddTask = true
    },
    showPopupSignUp() {
      this.popupSignUp = true
    },
    showPopupSignIn() {
      this.popupSignIn = true
    },
    showPopupEditTask(id: String) {
      const targetTask = JSON.parse(JSON.stringify(this.tasks.find(task => task.id === id)))
      this.taskEdit = { ...targetTask }
      this.popupEditTask = true
    },
    setFilter(activeFilter: Filter) {
      this.filter = activeFilter
    },
    completedTask(data: TaskCompleted) {
      this.tasksCompleted.push(data)
      this.removeTask(data.id)
    }
  }
})
</script>
 
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
