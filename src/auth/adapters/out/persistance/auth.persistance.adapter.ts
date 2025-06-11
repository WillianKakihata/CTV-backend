import { InjectModel } from "@nestjs/mongoose";
import { AuthPersistenceOutputPort } from "src/auth/core/ports/out/persistance/auth.persistance.output.port";
import { Token } from "./models/token.model";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthPersistenceAdapter implements AuthPersistenceOutputPort {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  public async setToken(email: string, token: string): Promise<void> {
    await this.tokenModel.deleteMany({ email });

    await this.tokenModel.create({
      email,
      token,
      expiresAt: new Date(Date.now() + 1200 * 1000),
    });
  }

  async getToken(email: string, token: string): Promise<boolean> {
    const find = await this.tokenModel.findOne({ email: email, token: token });

    if (find && find.token == token) {
      await this.tokenModel.deleteMany({ email });
      return true;
    }

    return false;
  }
}