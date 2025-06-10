import { UserModelIn } from "../../domain/models/user.model.in";
import { UserModelOut } from "../../domain/models/user.model.out";

export interface SaveUserInputPort {
    execute(newUser: UserModelIn): Promise<UserModelOut>
}