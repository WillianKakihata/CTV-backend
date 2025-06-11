import { Injectable } from "@nestjs/common";
import { LoginUserModelIn } from "src/auth/core/domain/login.user.model.in";
import { LoginUserRequest } from "./request/login.user.request";
import { UserModelIn } from "src/user/core/domain/models/user.model.in";
import { SingUpUserRequest } from "./request/singup.user.request";

@Injectable()
export class AuthMapper {
    UserRequestToLoginUserModelIn(request: LoginUserRequest): LoginUserModelIn {
        return new LoginUserModelIn(
            request.email,
            request.password,
        );
    }

    UserRequestToUserModelIn(request: SingUpUserRequest): UserModelIn {
      return new UserModelIn(
        request.firstname,
        request.username,
        request.email,
        request.password,
      );
    
  }
}