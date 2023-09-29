<template>
    <AppForm class="form" @submit.prevent="create">
        <textarea class="form__textarea" @input="getValueTextarea(($event.target as HTMLInputElement).value)" placeholder="ВВедите текст задачи"></textarea>
        <div class="form__container">
            <AppInput class="form__input" type="date" v-model="task.deadlineDate" />
            <AppInput class="form__input" type="time" v-model="task.deadlineTime" />
        </div>
        <AppButton class="form__button" :class="!formValid() ? 'disabled' : ''" :disabled="!formValid()">Создать задачу
        </AppButton>
    </AppForm>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

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
        formValid(): Boolean {
            return Boolean(this.task.description.length > 5)
        },
        getValueTextarea(value: any): String {
            return this.task.description = value

        },
        create() {
            this.$emit('createTask', {
                id: String(Date.now()),
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
    &__textarea {
        resize: none;
        min-height: 100px;
        outline: none;
    }

    &__container {
        display: flex;
        gap: 0 20px;
    }

    &__button {}
}
</style>