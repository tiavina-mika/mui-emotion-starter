import { drivers } from "./drivers";
import { okrs } from "./okrs";
import { workspaces } from "./workspace";

export const products = [
  {
    name: "Roudoudou",
    shortName: "Roudoudou",
    description: "Hello desc there",
    icon: "🍕",
    workspace: workspaces[0],
    createdAt: "2023-06-07T08:03:46.197Z",
    updatedAt: "2023-06-07T08:03:46.197Z",
    objectId: "gKy5hhsLBn",
    okr: okrs[0],
    drivers
  },
  {
    name: "Produit 1x",
    shortName: "Produit 1",
    icon: "🍕",
    description: "Hello prdouct 1 desc there",
    workspace: workspaces[1],
    createdAt: "2023-06-08T07:42:42.084Z",
    updatedAt: "2023-06-08T07:42:42.084Z",
    objectId: "GZCI4UP4ql",
    okr: okrs[0],
    drivers
  },
  {
    name: "Heroic",
    shortName: "HERO",
    icon: "🍕",
    workspace: workspaces[2],
    createdAt: "2023-06-08T15:58:12.979Z",
    updatedAt: "2023-06-08T15:58:12.979Z",
    objectId: "ELOfvkTDmt"
  },
  {
    icon: "🍕",
    name: "Produit 2",
    shortName: "Prd",
    workspace: workspaces[2],
    createdAt: "2023-06-13T11:56:08.743Z",
    updatedAt: "2023-06-13T11:56:08.743Z",
    objectId: "UrZI55RknA"
  },
  {
    icon: "🍕",
    name: "Test001",
    shortName: "TST",
    workspace: workspaces[2],
    createdAt: "2023-06-13T20:28:10.787Z",
    updatedAt: "2023-06-13T20:28:10.787Z",
    objectId: "yIpaVJzk1b"
  }
];
