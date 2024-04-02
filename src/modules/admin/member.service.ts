import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class MemberService {
    constructor(private prisma: PrismaService) { }

    async findById(id: number) {
        try {
            let member = await this.prisma.admin.findUnique({
                where: {
                    id
                }
            })

            if (!member) throw { message: "Thành viên không tồn tại!" }

            return {
                data: member,
                err: null
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async findByLoginId(userName: string) {
        try {
            let admin = await this.prisma.admin.findUnique({
                where: {
                    userName
                }
            })

            if (!admin) throw { message: "Thành viên không tồn tại!" }

            return {
                data: admin,
                err: null
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async update(adminId: number, data: any) {
        try {
            let member = await this.prisma.admin.update({
                where: {
                    id: adminId
                },
                data: {
                    ...data,
                    updateTime: String(Date.now())
                }
            })

            return {
                data: member,
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async create(data: any) {
        try {
            let admin = await this.prisma.admin.create({
                data: {
                    ...data,
                    permission: "[]"
                }
            })

            return {
                data: admin
            }
        } catch (err) {
            return {
                err
            }
        }
    }
    async findByUserName(userName: string) {
        try {
            const data = await this.prisma.admin.findUnique({
                where: {
                    userName
                }
            })
            return {
                data
            }
        } catch (err) {
            return {
                err
            }
        }
    }
}