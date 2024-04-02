import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusSelect } from '@prisma/client';
interface createRoomDTO {
    title: string;
    description: string;
    bedCount: number;
    guestCount: number;
    bathroomCount: number;
    image: string;
    roomPrice: number;
    freewifi: StatusSelect;
    roomService: StatusSelect;
    TV: StatusSelect;
    beachView: StatusSelect;
    mountainView: StatusSelect;
    cityView: StatusSelect;
    hotelId: number;
}
@Injectable()
export class RoomService {
    constructor(private readonly prisma: PrismaService) { }
    async createRoom(data: createRoomDTO, img: any) {
        try {
            let newHotel = await this.prisma.room.create({
                data: {
                    ...data,
                    imgroom: {
                        create: [
                            ...img
                        ]
                    }
                },
                include: {
                    imgroom: true,
                }
            })
            return {
                status: true,
                message: "ok",
                data: newHotel
            }

        } catch (err) {
            console.log(err);
            return err
        }
    }
    async getroomByhotelId(hotelId: number) {
        try {
            let room = await this.prisma.room.findMany({
                where: {
                    hotelId: hotelId
                },
                include: {
                    imgroom: true,
                    hotel: true,
                }
            })
            return {
                data: room
            }
        } catch (err) {
            console.log(err);
            return {
                err
            }

        }
    }
    async getroomByRoomId(roomId: number) {
        try {
            let room = await this.prisma.room.findUnique({
                where: {
                    id: roomId
                },
                include: {
                    imgroom: true,
                    hotel: true,
                }
            })
            return {
                data: room
            }
        } catch (err) {
            console.log(err);
            return {
                err
            }

        }
    }
    async getall() {
        try {
            let hotel = await this.prisma.room.findMany({

                include: {
                    imgroom: true,
                    hotel: true,
                },
                take: 18
            })
            return {
                data: hotel
            }
        } catch (err) {
            console.log(err);
            return {
                err
            }

        }
    }
    async update(roomId: any, body: any) {
        try {
            let room = await this.prisma.room.update({
                where: {
                    id: roomId
                },
                data: {
                    ...body,
                    updateAt: new Date().toISOString()
                }
            })
            return {
                data: room
            }
        } catch (err) {
            console.log(err);
            return {
                err
            }

        }
    }



}
