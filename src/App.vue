
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
    <AppFormTaskEdit name="app-form-task-edit" @editTask="editTask" v-bind:taskEdit="taskEdit"/>
  </AppPopup>
  <AppNavigation/>
  <AppTaskList :tasks="tasks" @removeTask="removeTask" @showPopupEditTask="showPopupEditTask"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppMenu from "./components/AppMenu.vue"
import AppFormTaskAdd from "./components/AppFormTaskAdd.vue";
import AppFormSignUp from "./components/AppFormSignUp.vue"
import AppFormSignIn from "./components/AppFormSignIn.vue"
import AppTaskList from "./components/AppTaskList.vue";
import AppFormTaskEdit from "./components/AppFormTaskEdit.vue";
import AppNavigation from './components/AppNavigation.vue';
import Task from './types/Task'
import SignUp from './types/SignUp'
import SignIn from "./types/SignIn";
import AppState from "./types/AppState"

export default defineComponent({
  data(): AppState {
    return {
      tasks: [],
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
    }
  },
  components: { AppMenu, AppFormTaskAdd, AppFormSignUp, AppFormSignIn, AppTaskList, AppFormTaskEdit, AppNavigation },
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
      this.popupSignUp = false
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
      this.taskEdit = {...targetTask}
      this.popupEditTask = true
    },
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
