import Task from "./Task";
import { Filter } from "./Filter";
import TaskCompleted from "./TaskCompleted";
export default interface AppState {
    tasks: Task[];
    tasksCompleted: TaskCompleted[]
    taskEdit: Task;
    popupEditTask: Boolean;
    popupAddTask: Boolean;
    popupSignUp: Boolean;
    popupSignIn: Boolean;
    filter: Filter 
}
