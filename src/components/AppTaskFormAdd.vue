<template>
    <form class="form" @submit.prevent>
        <AppInput class="form__input" type="text" v-model="task.description" />
        <AppInput class="form__input" type="date" v-model="task.deadlineDate" />
        <AppInput class="form__input" type="time" v-model="task.deadlineTime" />
        <AppButton class="form__button" @click="create">Создать задачу</AppButton>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Task from '../types/Task'
import TaskState from '../types/TaskState'


export default defineComponent({
    data(): TaskState {
        return {
            task: {
                description: '',
                deadlineDate: '',
                deadlineTime: ''
            }
        }
    },
    methods: {
        create() {
            this.$emit('createTask', {
                id: Date.now(),
                ...this.task
            })
            this.task = {
                description: '',
                deadlineDate: '',
                deadlineTime: ''
            }
        },

    },
    emits: {
        createTask: (task: Task) => task
    }

})

</script>

<style lang="scss">
.form {
    display: flex;
    flex-direction: column;
    gap: 20px 0;

    &__input {}

    &__button {}
}
</style>