import { IUser } from "../types/user.type";

/**
 * get full name abbreviation
 * ex: John Doe to JM
 * @param user
 * @returns
 */
export const getUserFullNameAbbreviation = (
  user: Record<string, any>
): string => {
  if (!user) {
    return "US";
  }
  if (!user.lastName && !user.firstName) {
    return "US";
  }
  let abbreviatedName = user.lastName.charAt(0);
  if (user.firstName) {
    abbreviatedName += user.firstName.charAt(0);
  }
  return abbreviatedName.toUpperCase();
};

/**
 * get user full name
 * @param person
 * @returns
 */
export const getUserFullName = (person: Record<string, any>): string => {
  if (!person) return "";
  let name = person.lastName;
  if (person.firstName) {
    name += " " + person.firstName;
  }
  return name;
};

/**
 * get followers, owner and leader from entity
 * @param item 
 */
export const getAllMembers = (item: Record<string, any>): IUser[] => {
  const members = item?.followers || [];
  if (item.owner) {
    members.push(item.owner);
  }

  if (item.leader) {
    members.push(item.leader);
  }

  return members;
}