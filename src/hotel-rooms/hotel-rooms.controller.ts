import { Controller, Get, Post, Body } from '@nestjs/common';
import { AddRoomDto } from 'src/hotel-rooms/dto/add-room.dto';
import HotelRooms from 'src/hotel-rooms/hotel-room.entity';
import { HotelRoomsService } from 'src/hotel-rooms/hotel-rooms.service';

@Controller('/hotel-rooms')
export class HotelRoomsController {
  constructor(private readonly hotelRoomsService: HotelRoomsService) {}

  @Get()
  getAvailableRooms(): Promise<[HotelRooms[], number]> {
    return this.hotelRoomsService.getAvailableRooms();
  }

  @Post()
  addRoom(@Body() data: AddRoomDto): Promise<HotelRooms> {
    return this.hotelRoomsService.addRoom(data);
  }

  @Post('/fill-mock-data')
  addTenRandomRooms(): Promise<HotelRooms[]> {
    return this.hotelRoomsService.addTenRandomRooms();
  }
}
