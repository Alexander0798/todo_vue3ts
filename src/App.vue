
<template>
  <AppMenu @showPopupSignUp="showPopupSignUp" @showPopupAddTask="showPopupAddTask" @showPopupSignIn="showPopupSignIn" />
  <AppPopup v-model:show="popupAddTask">
    <AppFormTaskAdd @createTask="addTask" />
  </AppPopup>
  <AppPopup v-model:show="popupSignUp">
    <AppFormSignUp @signUp="signUp" />
  </AppPopup>
  <AppPopup v-model:show="popupSignIn">
    <AppFormSignIn @signIn="signIn" />
  </AppPopup>
  <AppTaskList :tasks="tasks" @removeTask="removeTask"/>
</template>

<script lang="ts">
import AppMenu from "./components/AppMenu.vue"
import AppFormTaskAdd from "./components/AppFormTaskAdd.vue";
import AppFormSignUp from "./components/AppFormSignUp.vue"
import AppFormSignIn from "./components/AppFormSignIn.vue"
import Task from './types/Task'
import SignUp from './types/SignUp'
import SignIn from "./types/SignIn";
import AppState from "./types/AppState"
import { defineComponent } from 'vue'
import AppTaskList from "./components/AppTaskList.vue";
export default defineComponent({
  data(): AppState {
    return {
      tasks: [],
      popupAddTask: false,
      popupSignUp: false,
      popupSignIn: false,
    }
  },
  components: { AppMenu, AppFormTaskAdd, AppFormSignUp, AppFormSignIn, AppTaskList },
  methods: {
    addTask(task: Task) {
      console.log(task)
      this.tasks.push(task)
      this.popupAddTask = false
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
