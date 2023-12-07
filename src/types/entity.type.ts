import { z } from "zod";
import {
  componentsEntitySchema,
  entityDescriptionSchema,
  problematicDriverSchema,
  productsEntitySchema
} from "../validations/entity.validation";

import { ISelectOption } from "./app.type";
import { IDriver } from "./driver.type";
import { IOkr } from "./okr.type";
import { IProduct } from "./product.type";
import { ITeam } from "./team.type";
import { IUser } from "./user.type";
import { IWorkflow } from "./workflow.type";
import { IComponent } from "./component.type";
import { ITask } from "./task.type";

export type IEntityType = "problematic" | "feature" | "userStory" | "bug";
export enum IEntityTypeEnum {
  problematic = "problematic",
  feature = "feature",
  userStory = "userStory",
  bug = "bug"
}
export type IEntitySelectOption = ISelectOption<IEntityType>;
export type IEntityResult = {
  result: string;
  icon: string;
};

export interface IEntity {
  objectId: string;
  description: string;
  endDate?: string;
  startDate: string;
  title: string;
  confidenceLevel: number;
  priorisation?: number;
  drivers?: EntityDriver[];
  products?: IProduct[];
  results?: IEntityResult[];
  okrs?: IOkr[];
  members?: IUser[];
  followers?: IUser[];
  leader?: IUser;
  owner?: IUser;
  user?: IUser;
  workflow: IWorkflow;
  components?: IComponent[];
  teams?: ITeam[];
  effort?: number;
  type: IEntityType;
  ticket?: string; // TODO: should be required later
  createdAt?: string | Date;
  udpatedAt?: string | Date;
  tasks?: ITask[];
}

export type ITrustLevelOption = {
  min: number;
  max: number;
  label: string;
  title: string;
  color: "warning" | "error" | "success";
};

export type EntityDriver = {
  driver: IDriver;
  impact: number;
};

export type IEntityDriverOption = {
  icon: string;
  color: string;
};

export type IProblematicDriverInput = z.infer<typeof problematicDriverSchema>;

export type IViewTableData<V = string> = {
  header: {
    label: string;
    value: V;
  };
  entities: IEntity[];
};

export type IEntityDescriptionInput = z.infer<typeof entityDescriptionSchema>;
export type IProductsEntityFormInput = z.infer<typeof productsEntitySchema>;
export type IComponentsEntityFormInput = z.infer<typeof componentsEntitySchema>;
