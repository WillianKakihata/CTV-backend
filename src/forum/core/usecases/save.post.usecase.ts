import { Inject, Injectable } from "@nestjs/common";
import { SavePostInputPort } from "../ports/in/web/controllers/save.post.input.port";
import { ForumModelIn } from "../domain/models/forum.model.in";
import { ForumModelOut } from "../domain/models/forum.model.out";

import { ForumPersistenceOutputPort } from "../ports/out/forum.persistence.output.port";
import { ForumMapper } from "src/forum/adapters/in/web/controllers/dto/forum.mapper";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SavePostUseCase implements  SavePostInputPort{
    constructor(
        @Inject('ForumPersistenceOutputPort') private readonly forumPersistenceAdapter: ForumPersistenceOutputPort,
        private readonly forumMapper: ForumMapper,
        private readonly configService: ConfigService)
     { }

    async execute(newForum: ForumModelIn): Promise<ForumModelOut> {
         const ForumDocument = await this.forumPersistenceAdapter.savePost(newForum);
        return this.forumMapper.ForumDocumentToForumModelOut(ForumDocument);
    }
    

}