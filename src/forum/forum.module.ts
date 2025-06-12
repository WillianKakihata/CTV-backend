import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Forum, ForumSchema } from "./adapters/out/persistance/models/forum.model";
import { ForumMapper } from "./adapters/in/web/controllers/dto/forum.mapper";
import { ForumPersistenceAdapter } from "./adapters/out/persistance/forum.persistance.adapter";
import { SavePostUseCase } from "./core/usecases/save.post.usecase";
import { FindAllPostUseCase } from "./core/usecases/find.all.post.usecase";
import { FindByIdPostUseCase } from "./core/usecases/find.by.id.usecase";
import { ForumController } from "./adapters/in/web/controllers/forum.controller";


@Module({
    imports: [MongooseModule.forFeature([{ name: Forum.name, schema: ForumSchema }])],
    controllers: [ForumController],
    providers: [ForumMapper,
        {
            provide: 'ForumPersistenceOutputPort',
            useClass: ForumPersistenceAdapter
        },
        {
            provide: 'SavePostInputPort',
            useClass: SavePostUseCase
        },
        {
            provide: 'GetAllPostInputPort',
            useClass: FindAllPostUseCase
        },
        {
            provide: 'FindByidPostsInputPort',
            useClass: FindByIdPostUseCase
        }
    ],
    exports: []
})
export class ForumModule { }