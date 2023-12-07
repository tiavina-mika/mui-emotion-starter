export type ITaskStatusType = "todo" | "in-progress" | "done";

export interface ITask {
  objectId: string;
  name: string;
  status: ITaskStatusType;
}
