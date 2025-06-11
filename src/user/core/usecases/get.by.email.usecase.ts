import { Inject, Injectable } from "@nestjs/common";
import { UserPersistenceOutputPort } from "../ports/out/persistance/user.persistence.output.port";
import { UserMapper } from "src/user/adapters/in/web/controllers/dto/user.mapper";
import { UserModelOut } from "../domain/models/user.model.out";
import { GetByEmailInputPort } from "../ports/in/get.by.email.user.input.port";
import { UserModelIn } from "../domain/models/user.model.in";

@Injectable()
export class getByUserInEmailUseCase implements GetByEmailInputPort {
    constructor(@Inject('UserPersistenceOutputPort') private readonly userPersistenceAdapter: UserPersistenceOutputPort,
        private readonly userMapper: UserMapper) { }

    async execute(email: string): Promise<UserModelOut> {
        const UserDocument = await this.userPersistenceAdapter.getByUserInEmail(email);
        return await this.userMapper.UserDocumentToUserModelOut(UserDocument);
    }



}