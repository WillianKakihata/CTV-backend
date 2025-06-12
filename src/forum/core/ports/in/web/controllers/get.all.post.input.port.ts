import { ForumModelOut } from "src/forum/core/domain/models/forum.model.out";

export interface GetAllPostInputPort {
    execute(): Promise<ForumModelOut[]>
}