import Task from "./Task";
import { Filter } from "./Filter";
import User from "./User";

export default interface AppState {
  user: User | null;
  tasks: Task[];
  taskEdit: Task;
  popupEditTask: Boolean;
  popupAddTask: Boolean;
  popupSignUp: Boolean;
  popupSignIn: Boolean;
  filter: Filter;
}
