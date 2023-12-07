import { z } from 'zod';

import { errorMap } from '../config/zod';

export const phaseSchema = z.object({
  name: z.string({ errorMap }),
  color: z.string({ errorMap }),
  backgroundColor: z.string({ errorMap }),
  entityTypes: z.array(z.enum(['problematic', 'feature', 'userStory', 'bug'])),
  isEnabled: z.boolean({ errorMap }).optional(),
});

export const editPhaseSchema = phaseSchema.pick({
  isEnabled: true,
});
