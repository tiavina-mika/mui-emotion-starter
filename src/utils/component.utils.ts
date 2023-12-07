import { IComponent } from "../types/component.type";
import { ISelectOption } from "../types/app.type";

export const formatComponentOptions = (
  components: IComponent[] = []
): ISelectOption[] =>
  components.map((component: IComponent) => ({
    value: component.objectId,
    label: component.name,
    icon: component.icon || "😊"
  }));
