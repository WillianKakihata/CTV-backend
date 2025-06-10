import { Injectable } from "@nestjs/common";
import { UserDocument } from "src/user/adapters/out/persistance/models/user.model";
import { UserModelOut } from "src/user/core/domain/models/user.model.out";

@Injectable()
export class UserMapper {

    UserDocumentToUserModelIn(document: UserDocument): UserModelOut {
        return new UserModelOut(
            document.id,
            document.firstname,
            document.username,
            document.email
        );

    }

    ArrayOfUserDocumentToUserModelOut(document: UserDocument[]): UserModelOut[] {
        if (!Array.isArray(document) || document.length === 0) {
            throw new Error("The 'document' parameter must be a non-empty array of UserDocument.");
        }

        return document.map((doc) => new UserModelOut(
            doc.id,
            doc.firstname,
            doc.username,
            doc.email
        ));
    }
}