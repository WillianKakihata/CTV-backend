import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/user/adapters/out/persistance/models/user.model";

@Schema()
export class Forum {
    @Prop({required: true})
    title: string;
    
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId;
    
    @Prop({required: true})
    description: string;

    @Prop({required: true})
    image: string;
}

export const ForumSchema = SchemaFactory.createForClass(Forum);
export type ForumDocument = HydratedDocument<Forum>;