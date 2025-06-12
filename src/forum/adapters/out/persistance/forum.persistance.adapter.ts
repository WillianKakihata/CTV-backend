import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ForumPersistenceOutputPort } from "src/forum/core/ports/out/forum.persistence.output.port";
import { ForumModelIn } from "src/forum/core/domain/models/forum.model.in";
import { Forum, ForumDocument } from "./models/forum.model";

@Injectable()
export class ForumPersistenceAdapter implements ForumPersistenceOutputPort {
    constructor(
        @InjectModel(Forum.name) private readonly forumModel: Model<Forum>,
    ) {}
    
    async savePost(newPost: ForumModelIn): Promise<ForumDocument> {
        return await this.forumModel.create(newPost);
    }

    async getAllPost(): Promise<ForumDocument[]> {
        return await this.forumModel.find();
    }

    async findByIdPost(id: string): Promise<ForumDocument> {
        const newPost = await this.forumModel.findById(id);
        if (!newPost) {
            throw new Error(`Forum with post ${newPost} not found`);
        }
        return newPost;
    }


}