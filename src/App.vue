
<template>
  <AppMenu v-bind:popupAddTask="popupAddTask" v-bind:popupLoginUp="popupLoginUp" @showPopupLoginUp="showPopupLoginUp"
    @showPopupAddTask="showPopupAddTask" />
  <AppPopup v-model:show="popupAddTask">
    <AppFormTaskAdd @createTask="addTask" />
  </AppPopup>
  <AppPopup v-model:show="popupLoginUp">
    <AppFormLoginUp @createNewUser="addNewUser"/>
  </AppPopup>
</template>

<script lang="ts">
import AppMenu from "./components/AppMenu.vue"
import AppFormTaskAdd from "./components/AppFormTaskAdd.vue";
import AppFormLoginUp from "./components/AppFormLoginUp.vue"
import Task from './types/Task'
import NewUser from "./types/NewUser";
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      popupAddTask: false,
      popupLoginUp: false
    }
  },
  components: { AppMenu, AppFormTaskAdd, AppFormLoginUp },
  methods: {
    addTask(task: Task) {
      console.log(task)
      this.popupAddTask = false
    },
    addNewUser(newUser: NewUser) {
      console.log(newUser)
      this.popupLoginUp = false
    },
    showPopupAddTask() {
      this.popupAddTask = true
    },
    showPopupLoginUp() {
      this.popupLoginUp = true
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
