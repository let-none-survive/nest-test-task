import HotelRooms from 'src/hotel-rooms/hotel-room.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
class ReservationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ type: Date })
  public startOrderDate: Date;

  @Column({ type: Date })
  public endOrderDate: Date;

  @ManyToOne((type) => HotelRooms, (room) => room.id)
  @JoinColumn({ name: 'room_id' })
  public room: HotelRooms;
}

export default ReservationEntity;
