import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { user } from '@prisma/client';
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }
    async findById(id: number) {
        try {
            let user = await this.prisma.user.findUnique({
                where: {
                    id: id
                },
            })
            if (!user) {
                throw "Tài khoản không tồn tại"
            }
            return {
                data: user
            }
        } catch (err) {
            return {
                err
            }
        }
    }
    async findMany() {
        try {
            let user = await this.prisma.user.findMany({})
            if (!user) {
                throw "Tài khoản không tồn tại"
            }
            return {
                data: user
            }
        } catch (err) {
            return {
                err
            }
        }
    }
    async findUser(loginInfo: string) {
        try {
            let user = await this.prisma.user.findUnique({
                where: {
                    userName: loginInfo
                }
            })
            if (!user) {
                user = await this.prisma.user.findUnique({
                    where: {
                        email: loginInfo
                    }
                })
            }
            if (!user) {
                throw "Tài khoản không tồn tại"
            }
            return {
                data: user
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async update(userId: number, updateData: any) {
        try {
            let user = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    ...updateData,
                    updateAt: String(Date.now())
                }



            });
            return {
                data: user
            };
        } catch (err) {
            console.log(err);
            return {
                err
            };
        }
    }
    // async updateimg(userId: number, imgcitizen: any) {
    //     try {
    //         let user = await this.prisma.user.update({
    //             where: {
    //                 id: userId
    //             },
    //             data: {

    //             },
    //             include: {
    //                 imgcitizen: true
    //             }



    //         });
    //         return {
    //             data: user
    //         };
    //     } catch (err) {
    //         console.log(err);
    //         return {
    //             err
    //         };
    //     }
    // }
    // async updateWallet(userName: string, amount: number) {
    //     try {
    //         const user = await this.prisma.user.findUnique({
    //             where: {
    //                 userName: userName
    //             }
    //         });

    //         if (!user) {
    //             throw new Error('User not found');
    //         }

    //         const updatedWallet = user.wallet + amount;

    //         const updatedUser = await this.prisma.user.update({
    //             where: {
    //                 userName: userName
    //             },
    //             data: {
    //                 wallet: updatedWallet,
    //                 updateAt: String(Date.now())
    //             }
    //         });

    //         return {
    //             data: updatedUser
    //         };
    //     } catch (err) {
    //         return {
    //             err
    //         }
    //     }
    // }
    async create(user: any) {
        try {
            let result = await this.prisma.user.create({
                data: user
            });

            return {
                data: result,
            };

        } catch (err) {
            console.log(err);

            return { err };
        }
    }
    async findUserByName(userName: string): Promise<{
        err?: any,
        data?: user
    }> {
        try {
            let user = await this.prisma.user.findUnique({
                where: {
                    userName,
                }
            })
            return {
                data: user
            }
        } catch (err) {
            return { err }

        }
    }

}
