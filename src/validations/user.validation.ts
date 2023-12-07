import { z } from "zod";
import { capitalizeFirstLetter } from "../utils/utils";
import { dayjsDateFieldSchema, selectOptionSchema } from "./app.validation";

// -------------------------------- //
// ------------ input ------------- //
// -------------------------------- //
const lastNameInputSchema = z
  .string()
  .min(1, "Nom de famille requis")
  .max(112, "Le nom de famille doit comporter 112 caractères maximum")
  .transform(capitalizeFirstLetter);

const firstNameInputSchema = z
  .string()
  .max(112, "Le prénom doit comporter 112 caractères maximum")
  .optional()
  .transform((value: any) => (value ? capitalizeFirstLetter(value) : ""));

const emailInputSchema = z
  .string()
  .email({ message: "Email required" })
  .max(120, "Email should have 120 characters maximum")
  .refine((value: string): string => value.toLowerCase());

// -------------------------------- //
// ------------ schemas ------------- //
// -------------------------------- //
export const lastNameSchema = z.object({
  lastName: lastNameInputSchema
});

export const firstNameSchema = z.object({
  firstName: firstNameInputSchema
});

export const emailSchema = z.object({
  email: emailInputSchema
});

const passwordFieldSchema = z
  .string()
  .min(8, "Le mot pass devrait avoir au moins 8 caractères")
  .max(64, "Le mot pass devrait avoir au plus 8 caractères");

const passwordConfirmationSchema = z.string().min(1, "Champ obligatoire");
export const changePasswordSchema = z
  .object({
    currentPassword: passwordFieldSchema,
    newPassword: passwordFieldSchema,
    newPasswordConfirmation: passwordConfirmationSchema
  })
  // compare the password and confirm password fields
  .refine((value) => value.newPassword === value.newPasswordConfirmation, {
    message: "Mot de passe différent",
    path: ["newPasswordConfirmation"]
  });

export const inviteUserBasicInfosSchema = z.object({
  firstName: firstNameInputSchema,
  lastName: lastNameInputSchema,
  email: emailInputSchema,
  profileMember: z.union([z.literal("maker"), z.literal("contributor")]),
  team: selectOptionSchema.nullable()
});

export const userProfilesSchema = z.object({
  profiles: z.array(z.string())
});

export const userDatesSchema = z.object({
  arrivalDate: dayjsDateFieldSchema,
  departureDate: dayjsDateFieldSchema.nullable()
});
