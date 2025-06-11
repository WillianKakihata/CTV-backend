import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./models/user.model";
import { UserModelIn } from "src/user/core/domain/models/user.model.in";
import { Model } from "mongoose";
import { UserPersistenceOutputPort } from "src/user/core/ports/out/persistance/user.persistence.output.port";

@Injectable()
export class UserPersistenceAdapter implements UserPersistenceOutputPort {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async saveUser(newuser: UserModelIn): Promise<UserDocument> {
        return await this.userModel.create(newuser);

    }
    async getAllUsers(): Promise<UserDocument[]> {
        return await this.userModel.find();
    }

    async getByUserInEmail(value: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email: value });
        if (!user) {
            throw new Error(`User with email ${value} not found`);
        }
        return user;
    }

}