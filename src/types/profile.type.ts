import { IPhase } from "./phase.type";

export interface IProfile {
  objectId: string;
  label: string;
  icon: string;
  phases?: IPhase[];
  createdAt: string;
  updatedAt: string;
  __type?: string;
  className?: string;
}
