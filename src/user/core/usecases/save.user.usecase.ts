import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SaveUserInputPort } from "../ports/in/save.user.input.port";
import { UserModelIn } from "../domain/models/user.model.in";
import { UserModelOut } from "../domain/models/user.model.out";
import { UserMapper } from "src/user/adapters/in/web/controllers/dto/user.mapper";
import { UserPersistenceAdapter } from "src/user/adapters/out/persistance/user.persistence.adapter";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SaveUserUseCase implements SaveUserInputPort {
    constructor(
        @Inject('UserPersistenceOutputPort') private readonly userPersistenceAdapter: UserPersistenceAdapter,
        private readonly userMapper: UserMapper,
        private readonly configService: ConfigService) { }

    async execute(newUser: UserModelIn): Promise<UserModelOut> {
        try {
            const hashedPassword = await bcrypt.hash(
                newUser.password,
                this.configService.get<string>('BCRYPT_SALT'),
            );

            const userToSave = new UserModelIn(
                newUser.firstname,
                newUser.username,
                newUser.email,
                hashedPassword
            )
            try {
                const UserDocument = await this.userPersistenceAdapter.saveUser(userToSave);
                return this.userMapper.UserDocumentToUserModelIn(UserDocument);
            } catch (error) {
                throw new BadRequestException({message: `erro aqui`});
            }
        } catch (error) {
            throw new BadRequestException(({message: `erro aqui`}));
        }

    }

}