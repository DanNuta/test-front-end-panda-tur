import { AxiosError } from "axios";

export const getServerError = (error: AxiosError<{ message: string }>) => {
  return error.response?.data?.message || "Ceva nu a mers bine :(";
};

export const capitalizeFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const getWorkflowSingular = (workflow: number) => {
  const workflowMap: Record<number, string> = {
    0: "Creat",
    1: "În lucru",
  };

  return workflowMap[workflow] || "Finisat";
};
