import { LoginUserModelIn } from "../../domain/login.user.model.in";

export interface LoginUserInputPort {
  execute(loginUser: LoginUserModelIn): Promise<{ access_token: string }>;
}