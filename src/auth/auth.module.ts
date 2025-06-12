import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./adapters/out/persistance/models/token.model";
import { AuthController } from "./adapters/in/web/controllers/auth.controller";
import { AuthMapper } from "./adapters/in/web/controllers/dto/auth.mapper";
import { AuthPersistenceAdapter } from "./adapters/out/persistance/auth.persistance.adapter";
import { LoginUseCase } from "./core/usecases/login.user.usecase";
import { SignUpUserUsecase } from "./core/usecases/singup.user.usecase";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthMapper,
        {
            provide: 'AuthPersistenceOutputPort',
            useClass: AuthPersistenceAdapter
        },
        {
            provide: 'LoginUserInputPort',
            useClass: LoginUseCase
        },
        {
            provide: 'SignUpUserInputPort',
            useClass: SignUpUserUsecase
        },
       
    ]
})
export class AuthModule { }