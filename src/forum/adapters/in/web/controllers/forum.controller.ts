import {
    Body, Controller, Get, Inject, Param, Post, UploadedFile, UseGuards, UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SavePostInputPort } from "src/forum/core/ports/in/web/controllers/save.post.input.port";
import { GetAllPostInputPort } from "src/forum/core/ports/in/web/controllers/get.all.post.input.port";
import { FindByidPostsInputPort } from "src/forum/core/ports/in/web/controllers/find.by.id.posts.input.port";
import { AuthGuard } from "src/common/guards/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreatePostRequest } from "./dto/request/create.post.request";
import { Express } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('forum')
export class ForumController {
    @Inject('SavePostInputPort')
    private readonly saveNewPost: SavePostInputPort;

    @Inject('GetAllPostInputPort')
    private readonly getAllPosts: GetAllPostInputPort;

    @Inject('FindByidPostsInputPort')
    private readonly getByPost: FindByidPostsInputPort;

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
    }))
    async createForum(
        @UploadedFile() file: Express.Multer.File,
        @Body() post: CreatePostRequest
    ) {
        if (file) {
            post.image = `http://localhost:3000/uploads/${file.filename}`;
        }
        console.log('Body:', post);
        console.log('File:', file);

        return this.saveNewPost.execute(post);
    }

    @Get()
    async getForum() {
        return this.getAllPosts.execute();
    }

    @Get('/:id')
    async getByIdForum(@Param('id') id: string) {
        return this.getByPost.execute(id);
    }
}
