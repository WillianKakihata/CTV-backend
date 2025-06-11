import { UserModelIn } from "src/user/core/domain/models/user.model.in";
import { SignUpUserInputPort } from "../ports/in/singup.user.input.port";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SaveUserInputPort } from "src/user/core/ports/in/save.user.input.port";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SignUpUserUsecase implements SignUpUserInputPort {

    constructor(@Inject('SaveUserInputPort') private readonly saveUser: SaveUserInputPort, private readonly jwtService: JwtService) { }
    async execute(signUpUser: UserModelIn): Promise<{ access_token: string; }> {
        const newUser = await this.saveUser.execute(signUpUser);
        const payload = {
            sub: newUser.id,
            email: newUser.email,
            username: newUser.username
        };
        let access_token: string;
        try {
            access_token = await this.jwtService.signAsync(payload);
        } catch (Error) {
            throw new BadRequestException(Error);
        }

        return {access_token};
    }

}