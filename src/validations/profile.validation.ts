import { z } from "zod";
import { errorMap } from "../config/zod";

export const profileSchema = z.object({
  label: z
    .string({ errorMap })
    .min(3, "Le libellé doit contenir au moins 3 caractères."),
  icon: z.string({ errorMap }).min(1, { message: "Doit être un emoji." }),
  phases: z.array(z.string({ errorMap })).optional()
});
