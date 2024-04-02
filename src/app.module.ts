import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { MailModule } from './modules/mail/mail.module';
// import { CourseModule } from './modules/course/course.module';
// import { CategoryModule } from './modules/category/category.module';
// import { ChapterLessonModule } from './modules/chapter_lesson/chapter_lesson.module';
// import { WalletModule } from './modules/wallet/wallet.module';
// import { ProductModule } from './modules/product/product.module';
import { MemberModule } from './modules/admin/member.module';
// import { LoginModule } from './modules/login/login.module';
// import { ReceiptModule } from './modules/receipt/receipt.module';
import { ChatModule } from './modules/chat/chat.module';
import { DiscordSocketModule } from './modules/discord-socket/discord-socket.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { RoomModule } from './modules/room/room.module';
import { TypeModule } from './modules/type/type.module';

@Module({
  imports: [UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    MailModule,
    MemberModule,
    // CourseModule,
    // CategoryModule,
    // ChapterLessonModule,
    ChatModule,
    DiscordSocketModule,
    HotelModule,
    RoomModule,
    TypeModule,
    // WalletModule,
    // ProductModule,
    // ReceiptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
