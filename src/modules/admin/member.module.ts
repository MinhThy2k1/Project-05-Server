import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TokenAuthenMiddleware } from 'src/middlewares/authen.member.middleware';


@Module({
  controllers: [MemberController],
  providers: [MemberService, TokenAuthenMiddleware],
})
export class MemberModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenAuthenMiddleware)
      .forRoutes(
        { path: "manager/email/:token", method: RequestMethod.ALL, version: "1" },
        { path: "manager/:id/change-permission", method: RequestMethod.PATCH, version: "1" },
        { path: "manager", method: RequestMethod.POST, version: "1" }
      )
  }
}

