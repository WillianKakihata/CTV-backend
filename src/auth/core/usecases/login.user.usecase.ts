import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { LoginUserInputPort } from "../ports/in/login.user.input.port";
import { LoginUserModelIn } from "../domain/login.user.model.in";
import { UserPersistenceOutputPort } from "src/user/core/ports/out/persistance/user.persistence.output.port";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase implements LoginUserInputPort {
    constructor(
        @Inject('UserPersistenceOutputPort')
        private readonly userPersistenceAdapter: UserPersistenceOutputPort,
        private readonly jwtService: JwtService,
    ) { }

    async execute(loginUser: LoginUserModelIn): Promise<{ access_token: string }> {
        const { email, password } = loginUser;
        let access_token: string;

        const user = await this.userPersistenceAdapter.getByUserInEmail(email);
        const hashedPassword = user.password;
        const passIsValid = await bcrypt.compare(password, hashedPassword);

        if (!passIsValid) {
            throw new BadRequestException();
        }

        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username
        };

        try {
            access_token = await this.jwtService.signAsync(payload);
        } catch (error) {
            throw new BadRequestException(error);
        }
        return { access_token }
    }

}