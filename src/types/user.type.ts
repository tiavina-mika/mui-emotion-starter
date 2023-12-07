import { z } from "zod";
import {
  lastNameSchema,
  firstNameSchema,
  emailSchema,
  changePasswordSchema,
  inviteUserBasicInfosSchema,
  userProfilesSchema,
  userDatesSchema
} from "../validations/user.validation";

export interface IRole {
  objectId: string;
  name: string;
}

export interface IUser {
  objectId: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  members?: IUser[];
  type?: string;
  role?: IRole;
}

export type ILastNameInput = z.infer<typeof lastNameSchema>;
export type IFirstNameInput = z.infer<typeof firstNameSchema>;
export type IEmailInput = z.infer<typeof emailSchema>;
export type IChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type IInviteUserBasicInfosInput = z.infer<
  typeof inviteUserBasicInfosSchema
>;
export type IUserProfilesInput = z.infer<typeof userProfilesSchema>;
export type IUserDatesInput = z.infer<typeof userDatesSchema>;

export type ICreateUserFormValues = {
  1?: IInviteUserBasicInfosInput;
  2?: IUserProfilesInput;
  3?: IUserDatesInput;
} | null;
