interface Task{
    description: String,
    deadlineDate: String,
    deadlineTime: String,
}
export default interface TaskState {
    task: Task
}