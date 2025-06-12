import { ForumModelIn } from "src/forum/core/domain/models/forum.model.in";
import { ForumModelOut } from "src/forum/core/domain/models/forum.model.out";

export interface SavePostInputPort {
    execute(newForum: ForumModelIn): Promise<ForumModelOut>
}