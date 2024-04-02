import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Patch, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RoomService } from './room.service';
import { Request, Response } from 'express';
import { createRoomDTO } from './dto/create-rom.dto';
import { RequestToken } from 'src/common/interface';
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }
  @Post('/')
  async create(@Req() req: RequestToken, img: any, @Body() body: any, @Res() res: Response) {
    try {
      let { newRoom, img } = body
      let { err, data } = await this.roomService.createRoom(newRoom, img);
      if (err) {
        throw "Lỗi CSDL"
      }
      res.status(200).json({
        message: "Tạo hotel thành công!",
        data
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({

        message: err ? [err] : ["Lỗi Server!"]
      })
    }
  }
  @Get('/:hotelId')
  async getroomByhotelId(@Req() req: Request, @Res() res: Response) {
    try {
      let { err, data } = await this.roomService.getroomByhotelId(Number(req.params.hotelId))

      if (err) {
        throw "Lỗi CSDL"
      }
      res.status(200).json({
        message: "Get room theo hotelid thành công!",
        data: {
          ...data
        }
      })
    } catch (err) {
      res.status(500).json({
        message: err ? [err] : ["Lỗi Server!"]
      })
    }
  }
  @Get('/findroom/:roomId')
  async getroomByRoomId(@Req() req: Request, @Res() res: Response) {
    try {
      let { err, data } = await this.roomService.getroomByRoomId(Number(req.params.roomId))

      if (err) {
        throw "Lỗi CSDL"
      }
      res.status(200).json({
        message: "Get room theo roomId thành công!",
        data: {
          ...data
        }
      })
    } catch (err) {
      res.status(500).json({
        message: err ? [err] : ["Lỗi Server!"]
      })
    }
  }
  @Get('/')
  async getRoom(@Req() req: Request, @Res() res: Response) {
    try {
      let { err, data } = await this.roomService.getall()

      if (err) {
        throw "Lỗi CSDL"
      }

      res.status(200).json({
        message: "Get room thành công!",
        data: {
          ...data
        }
      })
    } catch (err) {
      res.status(500).json({
        message: err ? [err] : ["Lỗi Server!"]
      })
    }
  }
  @Patch('/:id')
  async update(@Req() req: Request, @Body() body: any, @Res() res: Response) {
    try {
      let { err, data } = await this.roomService.update(Number(req.params.id), { ...body })

      if (err) {
        throw "Lỗi CSDL"
      }

      res.status(200).json({
        message: "chỉnh sửa thành công!",
        data: {
          ...data
        }
      })
    } catch (err) {
      res.status(500).json({
        message: err ? [err] : ["Lỗi Server!"]
      })
    }
  }


}
