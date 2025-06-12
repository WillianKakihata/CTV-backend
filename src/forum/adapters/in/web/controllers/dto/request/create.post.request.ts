import { IsMongoId, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostRequest {
    @IsString({ message: 'Title must be a string' })
    @MinLength(2, { message: 'Title must be at least 2 characters long' })
    public title: string;

    @IsMongoId({ message: 'UserId must be a valid Mongo ID' })
    public userId: string;

    @IsString({ message: 'Description must be a string' })
    @MinLength(5, { message: 'Description must be at least 5 characters long' })
    public description: string;

    @IsString({ message: 'Image must be a string' })
    @IsNotEmpty({ message: 'Image URL cannot be empty' })
    public image: string;
}