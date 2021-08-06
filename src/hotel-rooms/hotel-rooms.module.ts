import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import HotelRooms from 'src/hotel-rooms/hotel-room.entity';
import { HotelRoomsController } from 'src/hotel-rooms/hotel-rooms.controller';
import { HotelRoomsService } from 'src/hotel-rooms/hotel-rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRooms])],
  controllers: [HotelRoomsController],
  providers: [HotelRoomsService],
})
export class HotelRoomsModule {}
