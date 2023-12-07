import { z } from "zod";
import { capitalizeFirstLetter } from "../utils/utils";

export const viewSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .transform(capitalizeFirstLetter)
});
