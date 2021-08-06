import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddRoomDto } from 'src/hotel-rooms/dto/add-room.dto';
import HotelRooms from 'src/hotel-rooms/hotel-room.entity';
import { IsNull, LessThan, Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectRepository(HotelRooms)
    private readonly hotelRoomsRepository: Repository<HotelRooms>,
  ) {}
  async getAvailableRooms(): Promise<[HotelRooms[], number]> {
    return this.hotelRoomsRepository.findAndCount({
      where: [{ availableAt: IsNull() }, { availableAt: LessThan(moment()) }],
    });
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
          price: this.generateRandomFloatInRange(10000, 100000),
        }),
      );
    }
    return res;
  }

  private generateRandomFloatInRange = (min, max) => {
    return +(Math.random() * (max - min + 1) + min).toFixed(2);
  };
}
