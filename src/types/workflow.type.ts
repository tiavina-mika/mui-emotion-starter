import { IPhase } from "./phase.type";

export interface IWorkflow {
  objectId: string;
  name: string;
  status?: string;
  color: string;
  updatedAt: string;
  createdAt: string;
  phase: IPhase;
}
