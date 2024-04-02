// import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
// import { OnGatewayInit } from '@nestjs/websockets';
// import { ChannelType, Client, GatewayIntentBits, Guild, Message, TextChannel } from 'discord.js';
// import { ChatGateway } from '../chat/chat.gateway';


// @Injectable()
// export class DiscordSocketService implements OnModuleInit {
//     /* Bot */
//     client: Client;
//     /* Token dùng để connect tới bot */
//     /b/o/t/T/o/k/e/n: string = "";
//     /* ID của kênh discord muốn làm việc */
//     g/u/i/l/d/I/d/: string = "";
//     /* Khai báo ra thuộc tính guild được ép kiểu theo Class Guild của discord*/
//     guild: Guild;

//     constructor(@Inject(forwardRef(() => ChatGateway)) private readonly chatSocket: ChatGateway) {

//     }

//     onModuleInit() {
//         /* Khởi tạo instance client discord */
//         this.client = new Client({
//             intents: [
//                 GatewayIntentBits.Guilds,
//                 GatewayIntentBits.GuildMessages,
//                 GatewayIntentBits.MessageContent,
//             ],
//         })
//         /* Yêu cầu client đăng nhập vào bot */
//         this.client.login(this.botToken)
//         /* Lắng nghe sự kiện ready từ server discord, nếu bot đã sẵn sàng sử dụng thì chạy callback function*/
//         this.client.on("ready", () => {
//             console.log("Discord Bot Socket Đã Mở!")

//             /* Các lệnh sau chỉ chạy được sau khi bot sẵn sàng */
//             this.connectGuild();
//             console.log("da vao 1");


//             this.client.on("messageCreate", (message: Message) => {
//                 //console.log("message", message.content)
//                 if (!message.author.bot) {
//                     //message.reply("Ok thấy rồi!")
//                     console.log("error here")
//                     console.log("message", this.chatSocket.sendMessage(message.channelId, message.content))
//                 }
//             })
//         })
//     }

//     connectGuild(): void {
//         /* Lấy instance của kênh discord mình muốn làm việc theo ID Kênh và gán nó cho thuộc tính guild  */
//         this.guild = this.client.guilds.cache.get(this.guildId);
//     }

//     async createTextChannel(channelName: string): Promise<TextChannel> {
//         return this.guild.channels.create({
//             name: channelName,
//             type: ChannelType.GuildText
//         })
//     }

//     async getTextChannel(channelId: string): Promise<TextChannel> {
//         return (this.guild.channels.cache.get(channelId) as TextChannel)
//     }
// }
