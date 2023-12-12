import { Theme } from "@emotion/react";

import { ITextEditorCollaborationUser } from "../types/app.type";

const names = [
  "Tiavina Michael Ralainirina",
  "Tanteraka Mario",
  "Miora Sarobidy Razainirina",
  "Koloina",
  "Tatiana Maria",
  "Tojo Heritiana",
  "Jean Paul Valiha",
  "Tafita",
  "Manitra Raz",
  "Jean Rolland",
  "Ally Sheedy",
  "Debbie Harry",
  "Olivia Newton-John",
  "Elton John",
  "Michael J. Fox",
  "Axl Rose",
  "Emilio Estevez",
  "Ralph Macchio",
  "Rob Lowe",
  "Jennifer Grey",
  "Mickey Rourke",
  "John Cusack",
  "Matthew Broderick",
  "Justine Bateman",
  "Lisa Bonet"
];

const getRandomElement = (list: string[]): string => {
  return list[Math.floor(Math.random() * list.length)];
};

const getRandomName = () => getRandomElement(names);

export const getTextEditorInitialUser = (
  theme: Theme
): ITextEditorCollaborationUser => {
  const colors = [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.success.main,
    theme.palette.info.main,
    theme.palette.warning.main
  ];

  return {
    name: getRandomName(),
    color: getRandomElement(colors)
  };
};
