import { Body, Controller, Post } from '@nestjs/common';
import { ReservationDto } from 'src/reservation/dto/reservation.dto';
import { ReservationService } from 'src/reservation/reservation.service';

@Controller('/reserve')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  reserveRoom(@Body() data: ReservationDto): any {
    return this.reservationService.reserveRoom(data);
  }
}
