import { user } from "@prisma/client";
import { IsNotEmpty } from "class-validator";


export class createRoomDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    bedCount: number;
    @IsNotEmpty()
    guestCount: number;
    @IsNotEmpty()
    bathroomCount: number;
    @IsNotEmpty()
    image: string;
    @IsNotEmpty()
    roomPrice: number;
    @IsNotEmpty()
    freewifi: boolean;
    @IsNotEmpty()
    roomService: boolean;
    @IsNotEmpty()
    TV: boolean;
    @IsNotEmpty()
    beachView: boolean;
    @IsNotEmpty()
    mountainView: boolean;
    @IsNotEmpty()
    cityView: boolean;
    @IsNotEmpty()
    hotelId: number;


}