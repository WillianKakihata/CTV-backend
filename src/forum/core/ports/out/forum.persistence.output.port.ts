import { ForumDocument } from "src/forum/adapters/out/persistance/models/forum.model";
import { ForumModelIn } from "../../domain/models/forum.model.in";

export interface ForumPersistenceOutputPort {
    savePost(newPost: ForumModelIn): Promise<ForumDocument>;
    getAllPost(): Promise<ForumDocument[]>;
    findByIdPost(id: string): Promise<ForumDocument>
}