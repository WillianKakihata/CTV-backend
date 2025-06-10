import { UserDocument } from "src/user/adapters/out/persistance/models/user.model";
import { UserModelIn } from "src/user/core/domain/models/user.model.in";
import { UserModelOut } from "src/user/core/domain/models/user.model.out";

export interface UserPersistenceOutputPort {
    saveUser(newuser: UserModelIn): Promise<UserDocument>;
    getAllUsers(): Promise<UserDocument[]>;
}