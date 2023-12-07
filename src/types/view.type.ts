import { z } from "zod";
import { viewSchema } from "../validations/view.validation";

export interface IView {
  objectId: string;
  name: string;
  slug: string;
  favorite?: boolean;
}

export type IViewInput = z.infer<typeof viewSchema>;
