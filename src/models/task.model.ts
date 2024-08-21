import { TaskStatusEnum } from "../shared/taskStatus.enum";
import { User } from "./user.model";

export interface Task {
  id?: number;
  title?: string;
  description?: string;
  status?: TaskStatusEnum;
  excluded?: boolean;
  user?: User;
  createAt?: Date;
  updateAt?: Date;
}
