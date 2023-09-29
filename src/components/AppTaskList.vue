<template>
    <ul class="task__list">
        <AppTaskItem v-for="task in tasks" :key="String(task.id)" :id="`${task.id}`" :task="task" @removeTask="removeTask"
            @showPopupEditTask="showPopupEditTask" />
    </ul>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import Task from '../types/Task';
import AppTaskItem from './AppTaskItem.vue';
export default defineComponent({
    props: {
        tasks: {
            type: Array as PropType<Task[]>
        }
    },
    components: { AppTaskItem },
    methods: {
        removeTask(id: String) {
            this.$emit("removeTask", id)
        },
        showPopupEditTask(id: String) {
            this.$emit("showPopupEditTask", id)
        }
    },
    emits: {
        removeTask: (id: String) => String(id),
        showPopupEditTask: (id: String) => String(id)
    }
})

</script>
    
<style lang="scss">
.task {

    &__list {
        list-style-type: none;
        padding: 0;
    }
}
</style>