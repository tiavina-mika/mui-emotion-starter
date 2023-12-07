import { z } from "zod";
import { IUser } from "./user.type";
import { productSchema } from "../validations/product.validation";
import { IWorkspace } from "./workspace.type";
import { IOkr } from "./okr.type";

export interface IProduct {
  objectId: string;
  name: string;
  shortName: string;
  description?: string;
  icon: string;
  members?: IUser[];
  workspace?: IWorkspace;
  okr?: IOkr;
}

export interface IProductMember extends IUser {
  product: IProduct;
}

export type IProductInput = z.infer<typeof productSchema>;
