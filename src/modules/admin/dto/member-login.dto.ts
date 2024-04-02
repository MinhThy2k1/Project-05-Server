import { IsNotEmpty, Length } from "class-validator"

export class MemberLoginDto {
    @IsNotEmpty()
    userName: string
    @IsNotEmpty()
    password: string
}