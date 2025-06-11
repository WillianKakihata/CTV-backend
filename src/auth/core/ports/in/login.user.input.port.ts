import { LoginUserModelIn } from "../../domain/login.user.model.in";

export type loginUserReturnType = {
  access_token: string;
};

export interface LoginUserInputPort {
  execute(loginUser: LoginUserModelIn): Promise<{ access_token: string }>;
}