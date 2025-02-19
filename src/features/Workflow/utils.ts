import { PresetColorKey } from "antd/es/theme/internal";
import { BaseType } from "antd/es/typography/Base";

type WorkflowTag = {
  text: string;
  color: Exclude<BaseType, "danger">;
};

export const priorities = {
  0: "scazut",
  1: "medium",
  2: "ridicat",
};

export const workflow: Record<number, WorkflowTag> = {
  0: {
    text: "creat",
    color: "secondary",
  },

  1: {
    text: "preluat",
    color: "warning",
  },

  2: {
    text: "finisat",
    color: "success",
  },
};

export const prioritiesColor: Record<string, PresetColorKey> = {
  scazut: "blue",
  medium: "orange",
  ridicat: "red",
};
