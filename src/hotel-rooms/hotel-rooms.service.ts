import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { AddRoomDto } from 'src/hotel-rooms/dto/add-room.dto';
import { GetAvailableRoomsDto } from 'src/hotel-rooms/dto/get-available-rooms.dto';
import HotelRooms from 'src/hotel-rooms/hotel-room.entity';
import ReservationEntity from 'src/reservation/reservation.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectRepository(HotelRooms)
    private readonly hotelRoomsRepository: Repository<HotelRooms>,
    @InjectRepository(ReservationEntity)
    private readonly reservationService: Repository<ReservationEntity>,
  ) {}
  async getAvailableRooms(
    data: GetAvailableRoomsDto,
  ): Promise<[HotelRooms[], number]> {
    const reservedRoomsForQDatesIds = (
      await this.reservationService.find({
        where: [
          {
            endOrderDate: MoreThan(moment(data.startDate)),
            startOrderDate: LessThan(moment(data.endDate)),
          },
        ],
        relations: ['room'],
      })
    ).map((item) => item.room.id);

    return this.hotelRoomsRepository
      .createQueryBuilder('hotel_rooms')
      .where('hotel_rooms.id NOT IN (:...ids)', {
        ids: reservedRoomsForQDatesIds,
      })
      .getManyAndCount();
  }

  async addRoom(data: AddRoomDto): Promise<HotelRooms> {
    const room = this.hotelRoomsRepository.create({
      ...data,
    });
    await this.hotelRoomsRepository.save(room);
    return room;
  }

  async addTenRandomRooms(): Promise<HotelRooms[]> {
    const res = [];
    for (let i = 0; i < 10; i++) {
      res.push(
        await this.addRoom({
          price: this.generateRandomFloatInRange(10, 30),
        }),
      );
    }
    return res;
  }

  private generateRandomFloatInRange = (min, max) => {
    return +(Math.random() * (max - min + 1) + min).toFixed(2);
  };
}
