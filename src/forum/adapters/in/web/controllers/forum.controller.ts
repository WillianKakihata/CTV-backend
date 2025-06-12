import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { FindByidPostsInputPort } from "src/forum/core/ports/in/web/controllers/find.by.id.posts.input.port";
import { GetAllPostInputPort } from "src/forum/core/ports/in/web/controllers/get.all.post.input.port";
import { GetByEmailInputPort } from "src/user/core/ports/in/get.by.email.user.input.port";
import { CreatePostRequest } from "./dto/request/create.post.request";
import { SavePostInputPort } from "src/forum/core/ports/in/web/controllers/save.post.input.port";
import { AuthGuard } from "src/common/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('forum')
export class ForumController{
    @Inject('SavePostInputPort')
    private readonly saveNewPost: SavePostInputPort
    @Inject('GetAllPostInputPort')
    private readonly getAllPosts: GetAllPostInputPort
    @Inject('FindByidPostsInputPort')
    private readonly getByPost: FindByidPostsInputPort
    
    @Post()
    async createUser(@Body() post: CreatePostRequest) {
        return this.saveNewPost.execute(post);
    }

    @Get()
    async getUsers() {
        return this.getAllPosts.execute();
    }

    @Get('/:id')
     async getByEmailInUsers(@Param('id') id: string) {
        return this.getByPost.execute(id);
    }

}