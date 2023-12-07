import { z } from "zod";
import { driverSchema } from "./driver.validation";
import { profileSchema } from "./profile.validation";
import { phaseSchema } from "./phase.validation";
import { errorMap } from "../config/zod";
import { dayjsDateFieldSchema, selectOptionSchema } from "./app.validation";
import { updateMembers } from "./team.validation";

export const resultEntitySchema = z.object({
  result: z.string({ errorMap }),
  icon: z.string({ errorMap })
});

export const taskEntitySchema = z.object({
  task: z.string({ errorMap }),
  icon: z.string({ errorMap })
});

export const profileEntitySchema = z.object({
  profile: profileSchema,
  speed: z.number({ errorMap }),
  complexity: z.enum(["easy", "medium", "hard"])
});

export const phaseEntitySchema = z.object({
  phase: phaseSchema,
  profiles: z.array(profileEntitySchema).optional()
});

export const relatedProblemSchema = z.object({
  problematic: selectOptionSchema,
  impact: z.number({ errorMap })
});

export const relatedFeatureSchema = z.object({
  feature: selectOptionSchema,
  impact: z.number({ errorMap })
});

export const entitySchema = z.object({
  type: z.enum(["problematic", "feature", "userStory", "bug"]).nullable(),
  title: z
    .string({ errorMap })
    .min(3, "Le titre doit contenir au moins 3 caractères."),
  description: z.string({ errorMap }).nullable(),
  drivers: z.array(z.string({ errorMap })),
  products: z.array(z.string({ errorMap })),
  results: z.array(resultEntitySchema).optional(),
  deadline: dayjsDateFieldSchema.nullable().optional(),
  confidenceLevel: z.number(),
  member: selectOptionSchema.nullable(),
  members: z.array(selectOptionSchema).nullable(),
  leader: selectOptionSchema.optional(),
  owner: selectOptionSchema.optional(),
  followers: z.array(selectOptionSchema).optional(),
  tag: z.string({ errorMap }),
  components: z.array(z.string({ errorMap })).optional(),
  tasks: z.array(taskEntitySchema).optional(),
  problematics: z.array(relatedProblemSchema).optional(),
  features: z.array(relatedFeatureSchema).optional(),
  userStory: selectOptionSchema.nullable(),
  dependentFeatures: z.array(selectOptionSchema).optional(),
  dependentUserStories: z.array(selectOptionSchema).optional(),
  dependentBugs: z.array(selectOptionSchema).optional(),
  phases: z.array(phaseEntitySchema).optional()
});

export const entityDescriptionSchema = entitySchema.pick({ description: true });

export const driversEntitySchema = entitySchema.pick({ drivers: true });
export const productsEntitySchema = entitySchema.pick({ products: true });
export const resultsEntitySchema = entitySchema.pick({ results: true });
export const deadlineEntitySchema = entitySchema.pick({ deadline: true });
export const titleEntitySchema = entitySchema.pick({ title: true });
export const confidenceLevelEntitySchema = entitySchema.pick({
  confidenceLevel: true
});
export const membersEntitySchema = entitySchema
  .pick({
    member: true,
    members: true,
    leader: true,
    owner: true,
    followers: true
  })
  .transform(updateMembers);

export const descriptionEntitySchema = entitySchema.pick({
  title: true,
  description: true,
  products: true
});

export const descriptionFeatureSchema = descriptionEntitySchema.extend({
  tag: z.string({ errorMap })
});

export const descriptionUserStorySchema = descriptionEntitySchema.extend({
  tag: z.string({ errorMap })
});

export const descriptionBugSchema = descriptionEntitySchema.extend({
  tag: z.string({ errorMap })
});

export const problematicDriverValue = z.object({
  driver: driverSchema
    .extend({
      objectId: z.string()
    })
    .omit({ description: true, products: true }),
  impact: z.number()
});

export const problematicDriverSchema = z.object({
  drivers: z.array(problematicDriverValue)
});

export const componentsEntitySchema = entitySchema.pick({ components: true });
export const associatedProblematicEntitySchema = entitySchema.pick({
  problematics: true
});
export const associatedFeatureEntitySchema = entitySchema.pick({
  features: true
});
export const associatedUserStoryEntitySchema = entitySchema.pick({
  userStory: true
});
export const dependentFunctionalityEntitySchema = entitySchema.pick({
  dependentFeatures: true
});
export const dependentUserStoryEntitySchema = entitySchema.pick({
  dependentUserStories: true
});
export const dependentBugEntitySchema = entitySchema.pick({
  dependentBugs: true
});
export const tasksEntitySchema = entitySchema.pick({ tasks: true });
