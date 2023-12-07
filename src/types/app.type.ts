import { ReactNode } from "react";
import { IUser } from "./user.type";
import { AlertProps } from "@mui/material";

export interface ILayoutError {
  setLayoutError: (error: string) => void;
  layoutError: string;
}

export interface ISelectOption<V = any> {
  label: string;
  value: V;
  icon?: ReactNode | string;
}

export interface ISwitchOption extends ISelectOption {
  checked?: boolean;
}

export type IDirection = "horizontal" | "vertical";
// scroll classname
export type IScrollClassName = "scrollX" | "scrollY" | "scroll";
export type ISelectedOptionValue<T = string> = ISelectOption<T>["value"];

export interface IDashboardGlobalState extends ILayoutError, IUser {}

export type ISettingsTab =
  | "drivers"
  | "okr"
  | "teams"
  | "profiles"
  | "general"
  | "users"
  | "workflow"
  | "products";

// TODO: settings
export type IHomeTab = "settings" | "myFocus" | "views" | "search";
export type IAlert = {
  color: AlertProps["color"];
  type: "driver" | "team" | "okr" | "product";
} | null;

export type IViewTableDatasTab = "inProgress" | "roadmap" | "list";

export type IProjectProduct = "roadmap" | "insight";
export type IProjectProductOption = ISelectOption<IProjectProduct>;
