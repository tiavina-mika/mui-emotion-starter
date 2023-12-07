import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export const selectOptionSchema = z.object({
  label: z.string(),
  value: z.record(z.string(), z.string()).or(z.string()),
  icon: z.string().optional()
});

export const dayjsDateFieldSchema = z.instanceof(
  (dayjs as unknown) as typeof Dayjs
);
