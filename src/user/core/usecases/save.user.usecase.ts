import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SaveUserInputPort } from "../ports/in/save.user.input.port";
import { UserModelIn } from "../domain/models/user.model.in";
import { UserModelOut } from "../domain/models/user.model.out";
import { UserMapper } from "src/user/adapters/in/web/controllers/dto/user.mapper";
import { UserPersistenceAdapter } from "src/user/adapters/out/persistance/user.persistence.adapter";

@Injectable()
export class SaveUserUseCase implements SaveUserInputPort {
    constructor(@Inject('UserPersistenceOutputPort') private readonly userPersistenceAdapter: UserPersistenceAdapter,
        private readonly userMapper: UserMapper) { }
    async execute(newUser: UserModelIn): Promise<UserModelOut> {
        try {
            const UserDocument = await this.userPersistenceAdapter.saveUser(newUser);
            return this.userMapper.UserDocumentToUserModelIn(UserDocument);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}