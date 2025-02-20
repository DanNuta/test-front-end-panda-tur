import { BaseType } from "antd/es/typography/Base";

type WorkflowTag = {
  text: string;
  color: Exclude<BaseType, "danger">;
};

export const priorities = {
  0: {
    text: "scăzută",
    color: "blue",
  },
  1: {
    text: "medium",
    color: "orange",
  },
  2: {
    text: "ridicată",
    color: "red",
  },
};

export const workflow: Record<number, WorkflowTag> = {
  0: {
    text: "create",
    color: "secondary",
  },

  1: {
    text: "preluate",
    color: "warning",
  },

  2: {
    text: "finalizate",
    color: "success",
  },
};

export const setLocalStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};
