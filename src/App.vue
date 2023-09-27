
<template>
  <AppMenu v-bind:popupAddTask="showPopupAddTask" @popupTask="showPopupTask"/>
  <AppPopup v-model:show="showPopupAddTask">
    <AppTaskFormAdd @createTask="addTask"/>
  </AppPopup>
</template>

<script lang="ts">
import AppMenu from "./components/AppMenu.vue"
import AppTaskFormAdd from "./components/AppTaskFormAdd.vue";
import Task from './types/Task'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      showPopupAddTask: false,
    }
  },
  components: { AppMenu, AppTaskFormAdd },
  methods: {
    addTask(task: Task) {
      console.log(task) 
      this.showPopupAddTask = false
    },
    showPopupTask() {
      console.log("afsdf")
      this.showPopupAddTask = true
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
}</style>
