import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SaveUserInputPort } from "../ports/in/save.user.input.port";
import { UserModelIn } from "../domain/models/user.model.in";
import { UserModelOut } from "../domain/models/user.model.out";

import { UserMapper } from "src/user/adapters/in/web/controllers/dto/user.mapper";
import { UserPersistenceOutputPort } from "../ports/out/persistance/user.persistence.output.port";
import { GetAllUserInputPort } from "../ports/in/get.all.user.input.port";

@Injectable()
export class GetAllUserUseCase implements GetAllUserInputPort {
    constructor(@Inject('UserPersistenceOutputPort') private readonly userPersistenceAdapter: UserPersistenceOutputPort,
        private readonly userMapper: UserMapper) { }
    async execute(): Promise<UserModelOut[]> {
        try {
            const UserDocument = await this.userPersistenceAdapter.getAllUsers();
            return await this.userMapper.ArrayOfUserDocumentToUserModelOut(UserDocument);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}