import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LoginUserInputPort, loginUserReturnType } from "src/auth/core/ports/in/login.user.input.port";
import { SignUpUserInputPort } from "src/auth/core/ports/in/singup.user.input.port";
import { LoginUserRequest } from "./dto/request/login.user.request";
import { AuthMapper } from "./dto/auth.mapper";
import { SingUpUserRequest } from "./dto/request/singup.user.request";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('LoginUserInputPort') private readonly loginUsecase: LoginUserInputPort,
        @Inject('SignUpUserInputPort') private readonly singupUsecase: SignUpUserInputPort,
        private readonly authMapper: AuthMapper
    ) { }

    @Post('/login')
    async login(@Body() loginRequest: LoginUserRequest): Promise<loginUserReturnType> {
        const userModelIn = this.authMapper.UserRequestToLoginUserModelIn(loginRequest)
        return this.loginUsecase.execute(userModelIn);
    }

    @Post('/signup')
    async signup(@Body() sinupRequest: SingUpUserRequest): Promise<{access_token: string}> {
        const userModelIn = this.authMapper.UserRequestToUserModelIn(sinupRequest)
        return this.singupUsecase.execute(userModelIn);
    }
}