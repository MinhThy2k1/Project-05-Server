import { user } from "@prisma/client";
import { IsNotEmpty } from "class-validator";


export class createHotelDTO {
    @IsNotEmpty()
    type: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    image: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    distance: string;
    @IsNotEmpty()
    city: string;
    @IsNotEmpty()
    cheapestprice: number;
    @IsNotEmpty()
    locationDescription: string;
}