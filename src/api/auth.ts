import { baseAxios } from "./config";

type RegisterResponse = {
  message: string;
};

type LoginResponse = {
  token: string;
  user_id: number;
} & RegisterResponse;

export type Login = {
  email: string;
  password: string;
};
export type Register = {
  username: string;
} & Login;

export const auth = {
  register: async (body: Register): Promise<RegisterResponse> => {
    return await baseAxios.post("/register/test", body);
  },

  login: async (body: Login): Promise<LoginResponse> => {
    const { data } = await baseAxios.post("/login/test", body);

    return data;
  },
};
