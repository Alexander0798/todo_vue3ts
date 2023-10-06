<template>
  <AppHeader :user="user" @exitUser="exitUser" @showPopupSignUp="showPopupSignUp" @showPopupAddTask="showPopupAddTask"
    @showPopupSignIn="showPopupSignIn" />
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
  <main class="main">
    <h2 class="main__title" v-if="!user">Необходимо войти в профиль или Зарегистрироваться</h2>
    <h2 class="main__title" v-if="user && filter !== 'completed' && !taskFilter.length">Нет активных задач</h2>
    <h2 class="main__title" v-if="user && filter === 'completed' && !taskFilter.length">Нет завершенных задач</h2>
    <div class="main__task task">
      <AppTaskList>
        <AppTaskItem v-if="filter !== 'completed'" v-for="task in taskFilter" :key="String(task.id)" :id="`${task.id}`"
          :task="task" @removeTask="removeTask" @showPopupEditTask="showPopupEditTask" @completedTask="completedTask" />
        <AppTaskCompletedItemVue v-else v-for="taskCompleted in taskFilter" :key="String(taskCompleted.id)"
          :id="`${taskCompleted.id}`" :taskCompleted="taskCompleted" />
      </AppTaskList>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AppHeader from "./components/AppHeader.vue"
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
import User from './types/User';
import { Filter } from './types/Filter';

export default defineComponent({
  data(): AppState {
    return {
      user: null,
      tasks: [],
      taskEdit: {
        description: '',
        deadline: '',
        comment: '',
        completed: false,
        completedDate: '',
        id: ''
      },
      popupEditTask: false,
      popupAddTask: false,
      popupSignUp: false,
      popupSignIn: false,
      filter: "active",
    }
  },
  components: { AppHeader, AppFormTaskAdd, AppFormSignUp, AppFormSignIn, AppTaskList, AppFormTaskEdit, AppFilter, AppTaskItem, AppTaskCompletedItemVue },
  computed: {
    taskFilter(): Task[] {
      const currentDate = new Date()
      const currentTime = currentDate.getHours() * 1000 + currentDate.getMinutes() * 1000
      const currentTimeUnix = Date.now() / 1000
      switch (this.filter) {
        case "overdue":
          return this.tasks.filter(task => {
            const date = Date.parse(`${task.deadline}`) / 1000
            const overdue = date - currentTimeUnix
            if (overdue < 0) {
              return task
            }
          })
        case "current":
          return this.tasks.filter(task => {
            if (currentDate.toDateString() === new Date(String(task.deadline)).toDateString() &&
              (Boolean(currentTime))) {
              return task
            }
          })
        case "completed":
          return this.tasks.filter(task => task.completed)
        case "active":
        default:
          return this.tasks.filter(task => !task.completed)
      }
    }
  },
  methods: {
    addTask(data: Task) {
      console.log(data)
      this.tasks.push(data)
      this.popupAddTask = false
      this.setTask(data)
    },
    completedTask(data: Task) {
      this.removeTask(data.id)
      this.addTask(data)
      console.log(this.tasks)
    },
    backTaskCompleted(data: Task) {
      console.log(data)
    },  
    editTask(data: Task) {
      this.removeTask(data.id)
      this.tasks.push(data)
      this.popupEditTask = false
      this.pathTask(data)
    },
    removeTask(id: string) {
      this.tasks = this.tasks.filter(task => task.id !== id)
      this.deleteTask(id)
    },
    signUp(data: SignUp) {
      const user: User = {
        name: data.newUser.name,
        id: String(Date.now()),
        token: String(Date.now())
      }
      this.setCookie('user', user)
      this.user = user
      this.popupSignUp = false

    },
    signIn(data: SignIn) {
      console.log(data)
      this.popupSignIn = false
    },
// показ попапов

    showPopupAddTask() {
      this.popupAddTask = true
    },
    showPopupSignUp() {
      this.popupSignUp = true
    },
    showPopupSignIn() {
      this.popupSignIn = true
    },
    showPopupEditTask(id: string) {
      const targetTask = JSON.parse(JSON.stringify(this.tasks.find(task => task.id === id)))
      this.taskEdit = { ...targetTask }
      this.popupEditTask = true
    },
    setFilter(activeFilter: Filter) {
      this.filter = activeFilter
    },

    // api
    getTask() {
      const tasks: Task[] = JSON.parse(this.$cookie.getCookie('tasks'))
      console.log(tasks)
      if (tasks) {
        this.tasks = tasks
      }
    },


    removeCookie(key: string) {
      const targetCookie: Boolean = this.$cookie.isCookieAvailable(key)
      console.log(targetCookie)
      if (targetCookie) {
        this.$cookie.removeCookie(key)
      }
    },
    async setCookie(key: string, data: any) {
      this.$cookie.setCookie(key, JSON.stringify(data));
    },
    setTask(task: Task) {
      this.removeCookie('tasks')
      this.setCookie('tasks', this.tasks)
      console.log(task)
   
    },

    deleteTask(id: string) {
      this.removeCookie('tasks')
      this.setCookie('tasks', this.tasks)
      console.log(id)
    },
    deleteTaskCompleted(id: string) {
      this.removeCookie('tasksCompleted')
      this.setCookie('tasksCompleted', this.tasks)
      console.log(id)
    },
    pathTask(data: Task) {
      this.removeCookie('tasks')
      this.setCookie('tasks', this.tasks)
      console.log(data)
    },
    exitUser() {
      this.user = null
      this.tasks = []
      this.removeCookie('user')
      this.removeCookie('tasks')
      this.removeCookie('tasksCompleted')
    }
  },
  async mounted() {
    const user: User = this.$cookie.getCookie('user')
    if (user) {
      this.user = user
      this.getTask()
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
