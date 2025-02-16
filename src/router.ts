import { Register, Login, Workflow } from "@/features";

export const routes = [
  {
    path: "/login",
    component: Login,
    isPublic: true,
  },

  {
    path: "/register",
    component: Register,
    isPublic: true,
  },

  {
    path: "/workflow",
    component: Workflow,
    isPublic: false,
  },
];
