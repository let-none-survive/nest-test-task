import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import HotelRooms from 'src/hotel-rooms/hotel-room.entity';
import { StatusEnum } from 'src/hotel-rooms/interfaces/hotel-room.interface';
import { ReservationDto } from 'src/reservation/dto/reservation.dto';
import ReservationEntity from 'src/reservation/reservation.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { SchedulerRegistry } from '@nestjs/schedule';

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
    const isAvailable = (
      await this.hotelRoomsRepository.findOne({ id: data.room_id })
    ).status;
    if (isAvailable === StatusEnum.rented) {
      return {
        success: false,
        message: 'Room is no available',
      };
    }
    const insertedData = this.reservationEntityRepository.create({
      ...data,
      room: { id: data.room_id },
    });
    await this.reservationEntityRepository.save(insertedData);

    await this.hotelRoomsRepository.update(
      {
        id: data.room_id,
      },
      {
        status: StatusEnum.rented,
        availableAt: data.endOrderDate,
      },
    );

    const job = new CronJob(moment().from(data.endOrderDate), async () => {
      console.log('Running for', data.room_id);
      await this.hotelRoomsRepository.update(
        {
          id: data.room_id,
        },
        {
          status: StatusEnum.available,
          availableAt: null,
        },
      );
    });

    this.schedulerRegistry.addCronJob(`${Date.now()}-${data.room_id}`, job);

    job.start();

    return {
      success: true,
      data: insertedData,
    };
  }
}
