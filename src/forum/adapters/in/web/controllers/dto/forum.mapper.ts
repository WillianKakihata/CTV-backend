import { Injectable } from "@nestjs/common";
import { ForumDocument } from "src/forum/adapters/out/persistance/models/forum.model";
import { ForumModelOut } from "src/forum/core/domain/models/forum.model.out";

@Injectable()
export class ForumMapper {

    ArrayOfForumDocumentToForumModelOut(document: ForumDocument[]): ForumModelOut[] {
        if (!Array.isArray(document) || document.length === 0) {
            throw new Error("The 'document' parameter must be a non-empty array of ForumDocument.");
        }

        return document.map((doc) => new ForumModelOut(
            doc.id,
            doc.title,
            doc.userId,
            doc.description,
            doc.image
        ));
    }

    ForumDocumentToForumModelOut(document: ForumDocument): ForumModelOut {
        return new ForumModelOut(
            document.id,
            document.title,
            document.userId,
            document.description,
            document.image
        );

    }
}