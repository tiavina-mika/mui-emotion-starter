import { z } from "zod";
import { workspaceSchema } from "../validations/workspace.validation";

export interface IWorkspace {
  objectId: string;
  name: string;
  url: string;
  timezone?: string;
  space?: "shared" | "private";
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  __type?: string;
  className?: string;
}

export type IWorkspaceInput = z.infer<typeof workspaceSchema>;
