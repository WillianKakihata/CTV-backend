import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostRequest {
    @ApiProperty({type: String})
    @IsString({ message: 'Title must be a string' })
    @MinLength(2, { message: 'Title must be at least 2 characters long' })
    public title: string;

    @ApiProperty({type: String})
    @IsMongoId({ message: 'UserId must be a valid Mongo ID' })
    public userId: string;

    @ApiProperty({type: String})
    @IsString({ message: 'Description must be a string' })
    @MinLength(5, { message: 'Description must be at least 5 characters long' })
    public description: string;

    @ApiProperty({type: String})
    @IsString({ message: 'Image must be a string' })
    @IsNotEmpty({ message: 'Image URL cannot be empty' })
    public image: string;
}