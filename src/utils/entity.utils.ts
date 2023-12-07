import { Theme } from "@emotion/react";
import { ISelectOption } from "../types/app.type";
import {
  ITrustLevelOption,
  EntityDriver,
  IEntityType,
  IEntityDriverOption,
  IEntityTypeEnum
} from "../types/entity.type";

export const VIEWS_CARD_LIST_SPACING = 1.1;

const entityTypeOptions: ISelectOption<IEntityType>[] = [
  {
    value: "problematic",
    label: "Problematique"
  },
  {
    value: "feature",
    label: "Fonctionnalité"
  },
  {
    value: "userStory",
    label: "User story"
  },
  {
    value: "bug",
    label: "Bug"
  }
];

export const entityFields: ISelectOption[] = [
  {
    value: "none",
    label: "Aucune"
  },
  {
    value: "okrs",
    label: "Objectif"
  },
  {
    value: "drivers",
    label: "Drivers & Impact"
  },
  {
    value: "owner",
    label: "Owner"
  },
  {
    value: "leader",
    label: "Leader"
  },
  {
    value: "team",
    label: "Equipe"
  },
  {
    value: "role",
    label: "Rôle"
  },
  {
    value: "user",
    label: "User"
  },
  {
    value: "products",
    label: "Produit"
  },
  {
    value: "problematic",
    label: "Problématique"
  },
  {
    value: "features",
    label: "Feature"
  },
  {
    value: "deadline",
    label: "Deadline"
  },
  {
    value: "dependentFeatures",
    label: "Fonctionnalité dépendante"
  },
  {
    value: "dependentUserStories",
    label: "User story dépendante"
  },
  {
    value: "tasks",
    label: "Tâche associé"
  },
  {
    value: "dependentBugs",
    label: "Bug dépendante"
  },
  {
    value: "confidenceLevel",
    label: "Confiance"
  },
  {
    value: "component",
    label: "Composant"
  }
];

export const trustLevelOptions: ITrustLevelOption[] = [
  {
    min: 0,
    max: 25,
    label: "Vous êtes en terra incognita.",
    title: "Problème totalement inconnus",
    color: "error"
  },
  {
    min: 25,
    max: 75,
    label: "Votre problème comporte encore des inconnues.",
    title: "Problème comportant des inconnues",
    color: "warning"
  },
  {
    min: 75,
    max: 100,
    label: "Vous travaillez sur un problème largement connu.",
    title: "Problème largement connu",
    color: "success"
  }
];

export const entityDialogDetails = {
  [IEntityTypeEnum.problematic]: {
    title: "What should we solve ?",
    description:
      "We will together define the problem encountered and give you the means to solve it."
  },
  [IEntityTypeEnum.feature]: {
    title: "What sould we build ?",
    description:
      "We will together define our feature and give you the means to build it."
  },
  [IEntityTypeEnum.bug]: {
    title: "What is not working ?",
    description:
      "We will together quickly define our bug and give you the means to solve it."
  },
  [IEntityTypeEnum.userStory]: {
    title: "What should we developp ?",
    description:
      "We will together define our user story and give you the means to build it."
  }
};

/**
 * get trust level by value (mainly from slider or input)
 * @param value
 */
export const getTrustLevel = (value: number): ITrustLevelOption | undefined => {
  const currentTrustLevel = trustLevelOptions.find(
    (option) => value >= option.min && value <= option.max
  );

  return currentTrustLevel;
};

/**
 * calculate all entity drivers total imapct
 * @param drivers
 */
export const getTotalDriversImpact = (drivers: EntityDriver[]): number => {
  const sum = drivers.reduce((prev, cur) => prev + cur.impact, 0);
  return sum;
};

/**
 * get entity label by its type
 */
export const getEntityTypeLabel = (type: IEntityType): string => {
  const entity = entityTypeOptions.find(
    (currentType: ISelectOption<IEntityType>) => currentType.value === type
  );
  if (!entity) return "";
  return entity.label;
};

/**
 * get the icon and icon of the slider depending of the value
 * @param value slider value
 * @param theme mui theme
 */
export const getEntityDriverOption = (
  value: number,
  theme: Theme
): IEntityDriverOption => {
  const types: IEntityDriverOption[] = [
    { icon: "light", color: theme.palette.success.dark },
    { icon: "medium", color: theme.palette.info.dark },
    { icon: "complicated", color: theme.palette.warning.dark },
    { icon: "heavy", color: theme.palette.warning.main },
    { icon: "very-heavy", color: theme.palette.error.main }
  ];

  const currentValue = types.find((_, index: number): boolean => {
    const min = index;
    const max = (index + 1) * 20;
    return value > min && value <= max;
  });

  if (!currentValue) return types[0];

  return currentValue;
};
