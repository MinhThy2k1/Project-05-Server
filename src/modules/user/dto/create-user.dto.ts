import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    @MaxLength(18, { message: "Username must not be longer than 18 characters" })
    @Matches(/^[^\s-]+$/, { message: "Username cannot contain spaces or dashes" })
    userName: string
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Password must be at least 3 characters long' })
    @MaxLength(12, { message: 'Password must not be longer than 12 characters' })
    @Matches(/^[^\s]+$/, { message: 'Password cannot contain spaces' })
    password: string

}