import { Inject, Injectable } from "@nestjs/common";
import { ForumMapper } from "src/forum/adapters/in/web/controllers/dto/forum.mapper";
import { ForumModelIn } from "../domain/models/forum.model.in";
import { ForumPersistenceOutputPort } from "../ports/out/forum.persistence.output.port";
import { ForumModelOut } from "../domain/models/forum.model.out";
import { GetAllPostInputPort } from "../ports/in/web/controllers/get.all.post.input.port";

@Injectable()
export class FindAllPostUseCase implements GetAllPostInputPort {
    constructor(
        @Inject('ForumPersistenceOutputPort') private readonly forumPersistenceAdapter: ForumPersistenceOutputPort,
        private readonly forumMapper: ForumMapper) { }

    async execute(): Promise<ForumModelOut[]> {
        const ForumDocument = await this.forumPersistenceAdapter.getAllPost();
        return this.forumMapper.ArrayOfForumDocumentToForumModelOut(ForumDocument);
    }


}