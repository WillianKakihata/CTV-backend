import { Inject, Injectable } from "@nestjs/common";
import { FindByidPostsInputPort } from "../ports/in/web/controllers/find.by.id.posts.input.port";
import { ForumPersistenceOutputPort } from "../ports/out/forum.persistence.output.port";
import { ForumMapper } from "src/forum/adapters/in/web/controllers/dto/forum.mapper";
import { ForumModelOut } from "../domain/models/forum.model.out";

@Injectable()
export class FindByIdPostUseCase implements FindByidPostsInputPort {
    constructor(
        @Inject('ForumPersistenceOutputPort') private readonly forumPersistenceAdapter: ForumPersistenceOutputPort,
        private readonly forumMapper: ForumMapper) { }

    async execute(id: string): Promise<ForumModelOut> {
        const ForumDocument = await this.forumPersistenceAdapter.findByIdPost(id);
        return this.forumMapper.ForumDocumentToForumModelOut(ForumDocument);
    }


}