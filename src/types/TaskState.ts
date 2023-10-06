interface Task {
  description: string;
  deadlineDate: string;
  deadlineTime: string;
}
export default interface TaskState {
  task: Task;
}
