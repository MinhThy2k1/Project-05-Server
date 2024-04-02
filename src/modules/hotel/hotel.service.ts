import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hotelStatus, room } from '@prisma/client';
import { count } from 'console';
// import { createHotelDTO } from './dto/create-hotel.dto';
interface createHotelDTO {
    name: string;
    type: string;
    distance: string;
    image: string;
    address: string;
    cheapestprice: number;
    contact: string;
    city: string;
    locationDescription: string;
    createAt: string;
    updateAt: string;
    user: string;
}

@Injectable()
export class HotelService {
    groupBy(arg0: { by: string[]; _count: { city: boolean; }; }): any {
        throw new Error('Method not implemented.');
    }
    constructor(private readonly prisma: PrismaService) { }
    async createHotel(data: createHotelDTO, img: any) {
        try {
            let newHotel = await this.prisma.hotel.create({
                data: {
                    ...data,
                    status: hotelStatus.inactive,
                    img: {
                        create: [
                            ...img,
                        ],

                    }
                },
                include: {
                    user: true,
                    room: true,
                    img: true,
                }
            })
            return {
                status: true,
                message: "ok",
                data: newHotel
            }

        } catch (err) {
            console.log(err);
            error: err.message
            return err
        }
    }
    async getall(minPrice: number, maxPrice: number) {
        try {
            let hotel = await this.prisma.hotel.findMany({
                where: {
                    // status: hotelStatus.active,
                    cheapestprice: {
                        gte: minPrice, // Lớn hơn hoặc bằng minPrice
                        lte: maxPrice, // Nhỏ hơn hoặc bằng maxPrice
                    },
                },
                include: {
                    img: true,
                    room: true,
                    user: true,
                },
                take: 13
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
    async update(hotelId: any, body: any) {
        try {
            let hotel = await this.prisma.hotel.update({
                where: {
                    id: hotelId
                },
                data: {
                    ...body,
                    updateAt: new Date().toISOString()
                },
                include: {
                    img: true,
                    room: true,
                    user: true,
                },
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
    async getHotelByHotelId(id: number) {
        try {
            let hotel = await this.prisma.hotel.findUnique({
                where: {
                    id: id,
                },
                include: {
                    img: true,
                    room: true,
                    user: true,
                }
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
    // async countByCity(city: string): Promise<number> {
    //     const count = await this.prisma.hotel.count({
    //         where: { city: city },
    //     });
    //     return count;
    // }
    async findBycity(city: string, minPrice: number, maxPrice: number) {
        try {
            const count = await this.prisma.hotel.findMany({
                where: {

                    city: city,
                    cheapestprice: {
                        gte: minPrice, // Lớn hơn hoặc bằng minPrice
                        lte: maxPrice, // Nhỏ hơn hoặc bằng maxPrice
                    },
                },
            })
            return {
                data: count
            }

        } catch (err) {
            return err

        }
    }
    async findcity(city: string) {
        try {
            const find = await this.prisma.hotel.findMany({
                where: {

                    city: city,
                },
            })
            return {
                data: find
            }

        } catch (err) {
            return err

        }
    }
    async countHotelsByCity(city: string): Promise<number> {
        return await this.prisma.hotel.count({
            where: {
                city: city
            }
        });
    }
    // async countHotelsByType(type: string): Promise<number> {
    //     return await this.prisma.hotel.count({
    //         where: {
    //             type: type
    //         }
    //     });
    // }
    async countByType() {
        try {
            const hotelCount = await this.prisma.hotel.count({ where: { type: "hotel" } });
            const apartmentCount = await this.prisma.hotel.count({ where: { type: "apartment" } });
            const resortCount = await this.prisma.hotel.count({ where: { type: "resort" } });
            const villaCount = await this.prisma.hotel.count({ where: { type: "villa" } });
            const cabinCount = await this.prisma.hotel.count({ where: { type: "cabin" } });

            return [
                { type: "hotel", count: hotelCount },
                { type: "apartments", count: apartmentCount },
                { type: "resorts", count: resortCount },
                { type: "villas", count: villaCount },
                { type: "cabins", count: cabinCount },
            ];
        } catch (error) {
            throw error;
        }
    }
    async gethotelUserId(userId: number) {
        try {
            let hotel = await this.prisma.hotel.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    img: true,
                    room: true,
                    user: true,
                }
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
    async getalls() {
        try {
            let hotel = await this.prisma.hotel.findMany({

                include: {
                    img: true,
                    user: true,
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
}

