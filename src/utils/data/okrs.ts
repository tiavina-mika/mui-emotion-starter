import { entityDrivers } from "./drivers";

export const okrs = [
  {
    objectId: "okr01",
    name: "Activer plus facilement des nouveaux clients",
    icon: "🗣",
    drivers: entityDrivers
  },
  {
    objectId: "okr02",
    name: "Améliorer l’expérience client",
    icon: "🕹",
    drivers: [entityDrivers[0]]
  }
];
