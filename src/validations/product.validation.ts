import { z } from "zod";

import { errorMap } from "../config/zod";

export const productSchema = z.object({
  name: z.string({ errorMap }).min(2),
  shortName: z.string({ errorMap }).min(2),
  description: z
    .string({ errorMap })
    .max(200, { message: "Doit contenir au moins 200 caractères." }),
  icon: z.string({ errorMap }).min(1, { message: "Doit être un emoji." })
});

export const descriptionFormSchema = productSchema.pick({
  description: true
});
