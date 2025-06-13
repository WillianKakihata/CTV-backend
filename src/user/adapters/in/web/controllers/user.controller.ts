import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { GetAllUserInputPort } from "src/user/core/ports/in/get.all.user.input.port";
import { SaveUserInputPort } from "src/user/core/ports/in/save.user.input.port";
import { CreateUserRequest } from "./dto/request/CreateUserRequest";
import { GetByEmailInputPort } from "src/user/core/ports/in/get.by.email.user.input.port";
import { AuthGuard } from "src/common/guards/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController{
    @Inject('SaveUserInputPort')
    private readonly saveNewUser: SaveUserInputPort
    @Inject('GetAllUserInputPort')
    private readonly getAllUsers: GetAllUserInputPort
    @Inject('GetByEmailInputPort')
    private readonly getByEmail: GetByEmailInputPort
    @Post()
    async createUser(@Body() user: CreateUserRequest) {
        return this.saveNewUser.execute(user)
    }

    @Get()
    async getUsers() {
        return this.getAllUsers.execute();
    }

    @Get('/:email')
     async getByEmailInUsers(@Param('email') email: string) {
        return this.getByEmail.execute(email);
    }

}
