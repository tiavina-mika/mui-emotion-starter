import { IEntity } from "../../types/entity.type";
import { phases } from "./phase";
import { okrs } from "./okrs";
import { products } from "./product";
import { entityDrivers } from "./drivers";

export const components = [
  { objectId: "e01c01", name: "Paiments", icon: "🍞" },
  { objectId: "e02c02", name: "Stocks", icon: "💳" },
  { objectId: "e03c04", name: "Maintenance", icon: "💳" }
];

export const entities: IEntity[] = [
  {
    objectId: "entity01",
    ticket: "P-01",
    type: "problematic",
    title: "Nouveau parcours de commande",
    description:
      "Proposer à nos utilisateurs un parcours friendly & engageant pour les inciter à revenir commander plus souvent Proposer à nos utilisateurs un parcours friendly & engageant pour les inciter à revenir commander plus souventProposer à nos utilisateurs un parcours friendly & engageant pour les inciter à revenir commander plus souvent",
    effort: 1,
    priorisation: 75,
    drivers: [entityDrivers[0], entityDrivers[2]],
    results: [
      { result: "FTB Croissance 20%", icon: "🚘" },
      { result: "PS +20 sur les nouveaux clients", icon: "🚋" },
      { result: "Automatiser le parcours à 80%", icon: "🎃" }
    ],
    okrs: [okrs[1]],
    products: [products[0], products[1]],
    // products: [
    //   { objectId: "p01", name: "Produit 1", title: "My product 1", icon: "💸" },
    //   { objectId: "p02", name: "Produit 2", title: "My product 2", icon: "💸" }
    // ],
    confidenceLevel: 80,
    leader: {
      objectId: "u01",
      firstName: "Tiks",
      lastName: "Kun",
      email: "user01@gmail.com"
    },
    followers: [
      {
        objectId: "u02",
        firstName: "Tiavina",
        lastName: "Michael",
        email: "user02@gmail.com"
      },
      {
        objectId: "u03",
        firstName: "Ralainirina",
        lastName: "Michael",
        email: "user03@gmail.com"
      }
    ],
    teams: [
      {
        objectId: "team01",
        slug: "team01",
        name: "Tech",
        icon: "👩🏻‍💻",
        email: "team01@hotmail.com",
        alias: "team01",
        followers: []
      },
      {
        objectId: "team02",
        slug: "team01",
        name: "Tech",
        icon: "👩🏻‍💻",
        email: "team01@hotmail.com",
        alias: "team01",
        followers: []
      }
    ],
    members: [
      {
        objectId: "u04",
        firstName: "Ralainirina",
        lastName: "Mario",
        email: "user04@gmail.com"
      },
      {
        objectId: "u05",
        firstName: "Rajames",
        lastName: "Hohpik",
        email: "user05@gmail.com"
      }
    ],
    tasks: [
      {
        objectId: "task01",
        name: "Ici la tâche numéro 1",
        status: "todo"
      },
      {
        objectId: "task02",
        name: "Ici la tâche numéro 2",
        status: "in-progress"
      },
      {
        objectId: "task03",
        name: "Ici la tâche numéro 3",
        status: "in-progress"
      },
      {
        objectId: "task04",
        name: "Ici la tâche numéro 4",
        status: "done"
      },
      {
        objectId: "task05",
        name: "Ici la tâche numéro 5",
        status: "done"
      }
    ],
    workflow: {
      objectId: "wf01",
      name: "Backlog",
      color: "#e2e83e",
      phase: phases[0]
    },
    startDate: "Aout 2023",
    endDate: "Aout 2024",
    createdAt: "Juillet 2023",
    components: [components[0], components[1]]
  },
  // 2
  {
    objectId: "entity02",
    ticket: "F-01",
    type: "feature",
    title: "Revoir plan d’action activation",
    description: "Nous constatons une réduction du nombre d’inscription.",
    effort: 1,
    priorisation: 61,
    drivers: [entityDrivers[2]],
    results: [{ result: "Automatiser le parcours à 80%", icon: "🎃" }],
    okrs: [okrs[0]],
    products: [
      { objectId: "p01", name: "Produit 1", icon: "💸", title: "My product 1" }
    ],
    confidenceLevel: 80,
    leader: {
      objectId: "u01",
      firstName: "Tiks",
      lastName: "Kun",
      email: "user01@gmail.com"
    },
    followers: [],
    // CREATOR field?
    owner: {
      objectId: "u05",
      firstName: "Jennifer",
      lastName: "Anniston",
      email: "user05@gmail.com"
    },
    teams: [
      {
        objectId: "team021",
        slug: "team021",
        name: "Tech",
        icon: "👩🏻‍💻",
        email: "team021@hotmail.com",
        alias: "team021",
        followers: []
      },
      {
        slug: "team022",
        objectId: "team022",
        name: "Produit",
        icon: "💡",
        email: "team022@hotmail.com",
        alias: "team022",
        followers: []
      }
    ],
    workflow: {
      objectId: "wf01",
      name: "Development",
      color: "#e2e83e",
      phase: phases[1]
    },
    startDate: "Aout 2023",
    endDate: "Aout 2024",
    createdAt: "Juillet 2023"
  }
];
