import { UserModelOut } from "../../domain/models/user.model.out";

export interface GetAllUserInputPort {
    execute(): Promise<UserModelOut>
}