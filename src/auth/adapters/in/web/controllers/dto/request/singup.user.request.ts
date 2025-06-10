import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SingUpUserRequest {
    @IsString({ message: 'first name must be a string' })
    @Matches(/^[A-Za-z]+$/, {
        message:
            'First name must contain only letters. Numbers, special characters or spaces are not allowed',
    })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    public firstname: string;

    @IsString({ message: ' username must be a string' })
    @Matches(/^[A-Za-z]+$/, {
        message:
            'Username must contain only letters. Numbers, special characters or spaces are not allowed',
    })
    @MinLength(2, { message: 'Username must be at least 2 characters long' })
    public username: string;

    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    public email: string;

    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message:
                'Password confirmation must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
        },
    )
    public password: string;
}