// import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { ChatService } from './chat.service';
// import { Socket } from 'socket.io';
// import { Inject, OnModuleInit, forwardRef } from '@nestjs/common';
// import { ChatType, user } from '@prisma/client';
// import { verify } from 'jsonwebtoken';
// import { DiscordSocketService } from '../discord-socket/discord-socket.service';

// @WebSocketGateway({ cors: true })
// export class ChatGateway implements OnModuleInit {

//   @WebSocketServer()
//   SocketServer: Socket

//   socketClientList: {
//     token: string;
//     data: user;
//     sockets: Socket[]
//   }[] = []

//   constructor(
//     private readonly chatService: ChatService,
//     @Inject(forwardRef(() => DiscordSocketService))
//     private readonly discordService: DiscordSocketService
//   ) { }

//   onModuleInit() {
//     console.log("da vao day 4");
//     this.SocketServer.on("connection", (socketClient: Socket) => {
//       console.log("da vao day 3");

//       let token = String(socketClient.handshake.query.token);
//       /* Giải token */
//       let decodeData;
//       try {
//         decodeData = verify(token, process.env.JWT) as user;
//       } catch (error) {
//         console.error('Lỗi khi giải mã token:', error);
//         socketClient.emit("login-status", {
//           status: false,
//           message: [
//             "Token invalid"
//           ]
//         })
//         socketClient.disconnect();
//         return;
//       }
//       /* Thêm vào danh sách client đang truy cập */
//       this.addClient(token, socketClient, decodeData);
//     })
//   }

//   addClient(token: string, socketClient: Socket, decodeData: user) {
//     let flag = false;
//     for (let i in this.socketClientList) {
//       if (this.socketClientList[i].token == token) {
//         this.socketClientList[i].sockets.push(socketClient)
//         flag = true;
//         break
//       }
//     }
//     if (!flag) this.socketClientList.push({
//       token,
//       data: decodeData,
//       sockets: [
//         socketClient
//       ]
//     })
//     console.log("da dang nhap chat:", decodeData.userName);

//     socketClient.emit("login-status", {
//       status: true,
//       message: [
//         "Kết nối thành công!"
//       ]
//     })
//     this.sendHistory(decodeData.id)
//   }

//   async sendHistory(userId: number) {
//     let client = this.socketClientList.find(client => client.data.id == userId)
//     if (!client) return
//     try {
//       let { data, err } = await this.chatService.findHistory(userId);
//       for (let i in client.sockets) {
//         client.sockets[i].emit('history', data)
//       }
//     } catch (error) {
//       console.error('Lỗi khi gửi lịch sử chat:', error);
//     }
//   }

//   @SubscribeMessage('user-chat')
//   async userChat(@MessageBody() body: {
//     userId: number;
//     content: string;
//   }) {
//     let client = this.socketClientList.find(item => item.data.id == body.userId);
//     let historyObj;
//     try {
//       historyObj = await this.chatService.findHistory(client.data.id);
//     } catch (error) {
//       console.error('Lỗi khi lấy lịch sử chat:', error);
//       return;
//     }

//     if (historyObj.err) {
//       // Xử lý lỗi khi lấy lịch sử chat
//     }

//     if (historyObj.data.length == 0) {
//       // Logic khi không có lịch sử chat
//     } else {
//       // Logic khi có lịch sử chat
//     }
//     this.sendHistory(body.userId);
//   }

//   async sendMessage(channelId: string, content: string) {
//     let { err, data } = await this.chatService.findHistoryByDiscordChannel(channelId);
//     let userId = data.userId;
//     let client = this.socketClientList.find(client => client.data.id == data.userId);

//     if (client) {
//       let { data, err } = await this.chatService.createChat({
//         content: content,
//         createAt: String(Date.now()),
//         type: ChatType.TEXT,
//         userId: client.data.id,
//         discordChannel: channelId,
//         adminId: 1
//       });
//       this.sendHistory(client.data.id);
//     } else {
//       let { data, err } = await this.chatService.createChat({
//         content: content,
//         createAt: String(Date.now()),
//         type: ChatType.TEXT,
//         userId: userId,
//         discordChannel: channelId,
//         adminId: 1
//       });
//     }
//   }
// }
