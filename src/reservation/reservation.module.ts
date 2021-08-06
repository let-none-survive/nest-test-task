import { Module } from '@nestjs/common';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import HotelRooms from 'src/hotel-rooms/hotel-room.entity';
import { ReservationController } from 'src/reservation/reservation.controller';
import ReservationEntity from 'src/reservation/reservation.entity';
import { ReservationService } from 'src/reservation/reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity, HotelRooms]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
