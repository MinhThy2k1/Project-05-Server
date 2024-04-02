import { roleAdmin } from "@prisma/client";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateMemberDTO {
    @IsNotEmpty()
    userName: string
    @IsNotEmpty()
    role: roleAdmin
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
    @IsNotEmpty()
    phoneNumber: string
    @IsEmail()
    email: string
}