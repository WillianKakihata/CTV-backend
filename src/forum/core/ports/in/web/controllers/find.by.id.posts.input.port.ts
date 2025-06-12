import { ForumModelOut } from "src/forum/core/domain/models/forum.model.out";

export interface FindByidPostsInputPort {
    execute(id: string): Promise<ForumModelOut>
}