<template>
    <li class="task__completed-item">
        <p class="task__completed-description">{{ taskCompleted.description }}</p>
        <p class="task__completed-comment">{{ taskCompleted.comment }}</p>
        <div class="task__completed-container"> <span class="task__completed-deadline">{{ `задача завершина ${taskCompleted.dateCompleted}` }}</span>
            <AppButton class="task__completed-back">Отменить</AppButton>
        </div>
    </li>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import TaskCompleted from '../types/TaskCompleted';

export default defineComponent({  
    props: {
        taskCompleted: {
            type: Object as PropType<TaskCompleted>,
            required: true
        }
    },
    methods: {
  
    
        
    },
    emits: {
     
    }
})

</script>

<style lang="scss">
.task {

    &__item {
        border: 1px solid rebeccapurple;
        padding: 10px;
        position: relative;
    }

    &__description {
        margin: 0 0 15px;
        max-width: 900px;
        text-wrap: wrap;
        overflow: hidden;
    }

    &__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__deadline {
        display: inline-block;
    }

    &__button {
        outline: none;
        border: none;
        cursor: pointer;
    }

    &__comment {
        display: flex;
        flex-direction: column;
        gap: 10px 0;
    }

    &__comment-input {
        display: block;
        min-height: 30px;
        border-radius: 20px;
        padding: 10px 15px !important;
        border: 1px solid #ccc;

    }

    &__comment-wrapper {
        align-self: flex-end;
        display: flex;
        gap: 0 10px;
    }

    &__comment-button {}

    &__button-remove {
        width: 15px;
        height: 15px;
        background: center / contain no-repeat url("../assets/remove.svg");
        opacity: 0.3;
        position: absolute;
        right: 10px;
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

    .button {}


    &__button-complete {}
}
</style>