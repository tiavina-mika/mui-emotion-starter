import { IWorkflow } from "./workflow.type";
import { IWorkspace } from "./workspace.type";

export interface IPhase {
  objectId: string;
  name: string;
  color: string;
  backgroundColor: string;
  entityTypes: ("problematic" | "feature" | "userStory" | "bug")[];
  isEnabled?: boolean;
  workflows?: IWorkflow[];
  workspace?: IWorkspace;
  createdAt?: string;
  updatedAt?: string;
  __type?: string;
  className?: string;
}
