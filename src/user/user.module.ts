import { Module } from "@nestjs/common";
import { UserController } from "./adapters/in/web/controllers/user.controller";
import { UserMapper } from "./adapters/in/web/controllers/dto/user.mapper";
import { SaveUserUseCase } from "./core/usecases/save.user.usecase";
import { GetAllUserUseCase } from "./core/usecases/get.all.usecase";
import { UserPersistenceAdapter } from "./adapters/out/persistance/user.persistence.adapter";
import { User, UserSchema } from "./adapters/out/persistance/models/user.model";
import { MongooseModule } from "@nestjs/mongoose";
import { getByUserInEmailUseCase } from "./core/usecases/get.by.email.usecase";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserMapper,
        {
            provide: 'UserPersistenceOutputPort',
            useClass: UserPersistenceAdapter
        },
        {
            provide: 'SaveUserInputPort',
            useClass: SaveUserUseCase
        },
        {
            provide: 'GetAllUserInputPort',
            useClass: GetAllUserUseCase
        },
        {
            provide: 'GetByEmailInputPort',
            useClass: getByUserInEmailUseCase
        }
    ],
    exports: [
        {
            provide: 'GetByEmailInputPort',
            useClass: getByUserInEmailUseCase
        },
        {
            provide: 'SaveUserInputPort',
            useClass: SaveUserUseCase
        },
        {
            provide: 'UserPersistenceOutputPort',
            useClass: UserPersistenceAdapter
        }]
})
export class UserModule { }