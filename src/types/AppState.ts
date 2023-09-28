import Task from "./Task"
export default interface AppState {
    popupAddTask: Boolean,
    popupSignUp: Boolean,
    popupSignIn: Boolean,
    tasks: Task[]
}