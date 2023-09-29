import Task from "./Task";
export default interface AppState {
    tasks: Task[];
    taskEdit: Task;
    popupEditTask: Boolean;
    popupAddTask: Boolean;
    popupSignUp: Boolean;
    popupSignIn: Boolean;
}
