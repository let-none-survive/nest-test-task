import { StatusEnum } from 'src/hotel-rooms/interfaces/hotel-room.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class HotelRooms {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.available,
  })
  public status: string;

  @Column({ type: 'float' })
  public price: number;

  @Column({ type: Date, nullable: true })
  public availableAt?: Date;
}

export default HotelRooms;
