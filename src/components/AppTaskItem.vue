<template>
    <li class="task__item">
        <p class="task__description">{{ task.description }}</p>
        <div class="task__container"> <span class="task__deadline">{{ task.deadlineDate + " " +
            task.deadlineTime }}</span><button class="task__button-complete button">Выполнить</button></div>

        <button class="task__button task__button-remove" @click="removeTask"></button>
        <button class="button task__button task__button-edit" @click="showPopupEditTask"></button>
    </li>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import Task from '../types/Task';

export default defineComponent({
    props: {
        task: {
            type: Object as PropType<Task>,
            required: true
        }
    },
    methods: {
        removeTask() {
            this.$emit("removeTask", this.task.id)
        },
        showPopupEditTask() {
            this.$emit("showPopupEditTask", this.task.id)
        }
    },
    emits: {
        removeTask: (id: String) => String(id),
        showPopupEditTask: (id: String) => String(id),
    }
})

</script>

<style lang="scss">
.task {

    &__item {
        position: relative;
    }

    &__description {}
    &__container {
        display: flex;
        justify-content: space-between;
    }
    &__deadline {
        display: inline-block;
    }

    &__button {
        outline: none;
        border: none;
        cursor: pointer;
    }

    &__button-remove {
        width: 15px;
        height: 15px;
        background: center / contain no-repeat url("../assets/remove.svg");
        opacity: 0.3;
        position: absolute;
        right: 5px;
        top: 10px;

        &:hover {
            opacity: 1;
        }
    }

    &__button-edit {
        width: 15px;
        height: 15px;
        background: center / contain no-repeat url("../assets/edit.svg");
        opacity: 0.3;
        position: absolute;
        right: 30px;
        top: 10px;

        &:hover {
            opacity: 1;
        }
    }

    &__button-complete {
        
    }
}

</style>