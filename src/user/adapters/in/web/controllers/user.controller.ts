import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { GetAllUserInputPort } from "src/user/core/ports/in/get.all.user.input.port";
import { SaveUserInputPort } from "src/user/core/ports/in/save.user.input.port";
import { CreateUserRequest } from "./dto/request/CreateUserRequest";

@Controller('users')
export class UserController{
    @Inject('SaveUserInputPort')
    private readonly saveNewUser: SaveUserInputPort
    @Inject('GetAllUserInputPort')
    private readonly getAllUsers: GetAllUserInputPort

    @Post()
    async createUser(@Body() user: CreateUserRequest) {
        return this.saveNewUser.execute(user)
    }

    @Get()
    async getUsers() {
        return this.getAllUsers.execute();
    }
}