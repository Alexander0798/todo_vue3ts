<template>
    <AppForm class="form" @submit.prevent="edit">
        <textarea class="form__textarea"
            @input="getValueTextarea(($event.target as HTMLInputElement).value)">{{ task.description }}</textarea>
        <div class="form__container">
            <AppInput class="form__input" type="date" v-model="task.deadlineDate" :value="task.deadlineDate" />
            <AppInput class="form__input" type="time" v-model="task.deadlineTime" :value="task.deadlineTime" />
        </div>
        <AppButton class="form__button" :class="!formValid() ? 'disabled' : ''" :disabled="!formValid()">Изменить задачу
        </AppButton>
    </AppForm>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

import Task from '../types/Task'
import TaskState from '../types/TaskState'

export default defineComponent({
    data(): TaskState {
        return {
            task: {
                description: this.taskEdit.description,
                deadlineDate: ((new
                    Date(Number(this.taskEdit.deadline) * 1000)).toISOString()).split("T")[0],
                deadlineTime: ((new
                    Date(Number(this.taskEdit.deadline) * 1000)).toLocaleString("en-GB")).split(", ")[1]
            }
        }
    },
    props: {
        taskEdit: {
            type: Object as PropType<Task>,
            required: true
        }
    },
    methods: {
        formValid(): Boolean {
            if (this.task.description !== this.taskEdit.description || this.task.deadlineDate !== this.taskEdit.deadline || this.task.deadlineTime !== this.taskEdit.deadline) {
                return true
            }
            return false
        },
        getValueTextarea(value: any): String {
            return this.task.description = value

        },
        edit() {
            this.$emit('editTask', {
                id: this.taskEdit.id,
                description: this.taskEdit.description,
                deadline: String(new Date(`${this.task.deadlineDate} ${this.task.deadlineTime}`).getTime() /1000),
                completed: false,
                comment: '',
                completedDate: ''
            })
            this.task = {
                description: '',
                deadlineDate: '',
                deadlineTime: ''
            }
        },

    },

    emits: {
        editTask: (task: Task) => task
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