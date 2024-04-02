import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Patch, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { createReadStream, statSync, writeFileSync } from 'fs';
import { RequestToken } from 'src/common/interface';
import { get } from 'http';
import { promises } from 'dns';
import { createHotelDTO } from './dto/create-hotel.dto';
import { hotelStatus } from '@prisma/client';
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) { }
  @Post('/')
  async create(@Req() req: RequestToken, img: any, @Body() body: any, @Res() res: Response) {
    try {
      const userId = req.body.userId
      let { newHotel, img } = body
      let { err, data } = await this.hotelService.createHotel(newHotel, img);
      if (err) {
        throw {
          message: "Lỗi cơ sở dữ liệu!"
        }
      }
      res.status(200).json({
        message: "Tạo hotel thành công!",
        data
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message ? [err.message] : ["loi sever"]
      })
    }
  }
  @Get('/')
  async getHotel(@Req() req: Request, @Res() res: Response) {
    const minPrice = req.query.min ? parseInt(req.query.min.toString(), 10) : 1;
    const maxPrice = req.query.max ? parseInt(req.query.max.toString(), 10) : 999;
    try {
      let { err, data } = await this.hotelService.getall(minPrice, maxPrice)

      if (err) {
        throw "Lỗi CSDL"
      }

      res.status(200).json({
        message: "Get hotel thành công!",
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
      let { err, data } = await this.hotelService.update(Number(req.params.id), { ...body })

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
  @Get('/all')
  async getHotels(@Req() req: Request, @Res() res: Response) {
    try {
      let { err, data } = await this.hotelService.getalls()

      if (err) {
        throw "Lỗi CSDL"
      }

      res.status(200).json({
        message: "Get hotel thành công!",
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
  @Get('/find/:id')
  async getHotelByHotelId(@Req() req: Request, @Res() res: Response) {
    try {
      let { err, data } = await this.hotelService.getHotelByHotelId(Number(req.params.id))

      if (err) {
        throw "Lỗi CSDL"
      }

      res.status(200).json({
        message: "Get hotel theo hotelid thành công!",
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
  // @Get('/countbycity')
  // async countByCity(@Query('city') city: string, @Res() res) {
  //   try {
  //     const count = await this.hotelService.countByCity(city);
  //     return res.status("OK").json(count);
  //   } catch (error) {
  //     throw (`Count by city ${city} not found`);
  //   }
  // }
  // @Get('/countbycity')
  // async countByCity(@Query('cities') cities: string): Promise<number[]> {
  //   const cityList = cities.split(',');
  //   return this.hotelService.countByCity(cityList);
  // }
  // @Get('/city')
  // async countHotelsByCity(): Promise<{ city: string; count: number }[]> {
  //   return this.hotelService.countHotelsByCity();
  // }
  @Get('/findbycity/:city')
  async findbycity(city: string, @Req() req: Request, @Res() res: Response) {
    try {
      const minPrice = req.query.min ? parseInt(req.query.min.toString(), 10) : 1;
      const maxPrice = req.query.max ? parseInt(req.query.max.toString(), 10) : 999;
      let { err, data } = await this.hotelService.findBycity(req.params.city, minPrice, maxPrice)

      if (err) {
        throw "Lỗi CSDL"
      }
      if (maxPrice != maxPrice) {
        throw "Không có giá này"
      }

      res.status(200).json({
        message: "Tìm theo thành phố ok",
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
  @Get('/findcity/:city')
  async findcity(city: string, @Req() req: Request, @Res() res: Response) {
    try {
      let { err, data } = await this.hotelService.findcity(req.params.city)

      if (err) {
        throw "Lỗi CSDL"
      }
      res.status(200).json({
        message: "Tìm theo thành phố ok",
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
  @Get('/countByCity')
  async countHotelsByCity(@Query('cities') cities: string, @Res() res: Response) {
    try {
      const cityList = cities.split(',');
      const countList = await Promise.all(
        cityList.map(async (city) => {
          const count = await this.hotelService.countHotelsByCity(city);
          return { city, count };
        })
      );
      res.status(200).json(countList);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  // @Get('/countByType')
  // async countHotelsByType(@Query('type') type: string, @Res() res: Response) {
  //   try {
  //     const typeList = type.split(',');
  //     const countList = await Promise.all(
  //       typeList.map(async (type) => {
  //         const count = await this.hotelService.countHotelsByType(type);
  //         return { type, count };
  //       })
  //     );
  //     res.status(200).json(countList);
  //   } catch (err) {
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // }
  @Get('/countByType')
  async countByType() {
    try {
      return await this.hotelService.countByType();
    } catch (err) {
      console.log(err);

    }
  }
  @Get('/finduser/:userId')
  async gethotelUserId(@Req() req: Request, @Res() res: Response) {
    try {
      let { err, data } = await this.hotelService.gethotelUserId(Number(req.params.userId))

      if (err) {
        throw "Lỗi CSDL"
      }

      res.status(200).json({
        message: "Get hotel theo userid thành công!",
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



