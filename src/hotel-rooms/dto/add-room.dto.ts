import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoomDto {
  @ApiProperty()
  @IsNumber()
  readonly price: number;
}
