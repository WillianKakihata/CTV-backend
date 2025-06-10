import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Token {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  token: string;

  @Prop({ required: true, type: Date })
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 5 });
export type TokenDocument = HydratedDocument<Token>;