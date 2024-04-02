import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestToken } from 'src/common/interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { admin } from '@prisma/client'
import { token } from 'src/utils/token';
import { user } from '@prisma/client';
@Injectable()
export class TokenAuthenMiddleware implements NestMiddleware {

  constructor(private prisma: PrismaService) { }

  async use(req: RequestToken, res: Response, next: NextFunction) {
    try {
      let tokenCode = (req.headers?.token ? String(req.headers?.token) : req.params.token) || null;
      tokenCode = tokenCode ? tokenCode : String(req.query.token);
      if (!tokenCode) return res.status(413).json({
        message: "Xác thực thất bại!"
      })

      let tokenData = token.decodeToken(tokenCode)
      req.tokenData = tokenData;

      let admin = await this.prisma.admin.findUnique({
        where: {
          id: (tokenData as admin).id
        }
      })
      let authen = await this.prisma.user.findUnique({
        where: {
          id: (tokenData as user).id
        }
      })

      if (!admin) throw false
      if (admin.updateTime != (tokenData as admin).updateTime) throw false

      next();
    } catch (err) {
      return res.status(413).json({
        message: "Xác thực thất bại!"
      })
    }
  }
}
