import ReservationEntity from 'src/reservation/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class HotelRooms {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'float' })
  public price: number;

  @OneToMany((type) => ReservationEntity, (entity) => entity.room)
  public reservations: ReservationEntity[];
}

export default HotelRooms;
