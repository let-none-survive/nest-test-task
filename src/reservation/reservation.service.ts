import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import HotelRooms from 'src/hotel-rooms/hotel-room.entity';
import { ReservationDto } from 'src/reservation/dto/reservation.dto';
import ReservationEntity from 'src/reservation/reservation.entity';
import { MoreThan, Repository } from 'typeorm';

interface ResponseInterface<T> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationEntityRepository: Repository<ReservationEntity>,
    @InjectRepository(HotelRooms)
    private readonly hotelRoomsRepository: Repository<HotelRooms>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async reserveRoom(
    data: ReservationDto,
  ): Promise<ResponseInterface<ReservationEntity>> {
    const isReserved = await this.reservationEntityRepository.findOne({
      endOrderDate: MoreThan(DateTime.now()),
    });
    if (!!isReserved) {
      return {
        success: false,
        message: 'Room is no available',
      };
    }
    // const targetRoom;
    // const isAvailable = targetRoom.endOrderDate;
    // if (isAvailable === StatusEnum.rented) {
    //   return {
    //     success: false,
    //     message: 'Ro/om is no available',
    //   };
    // }
    const insertedData = this.reservationEntityRepository.create({
      ...data,
      room: { id: data.room_id },
    });
    await this.reservationEntityRepository.save(insertedData);

    // await this.hotelRoomsRepository.update(
    //   {
    //     id: data.room_id,
    //   },
    //   {
    //     availableAt: data.endOrderDate,
    //   },
    // );
    //
    // const job = new CronJob(moment().from(data.endOrderDate), async () => {
    //   console.log('Running for', data.room_id);
    //   await this.hotelRoomsRepository.update(
    //     {
    //       id: data.room_id,
    //     },
    //     {
    //       availableAt: null,
    //     },
    //   );
    // });
    //
    // this.schedulerRegistry.addCronJob(`${Date.now()}-${data.room_id}`, job);
    //
    // job.start();

    return {
      success: true,
      data: insertedData,
    };
  }
}
