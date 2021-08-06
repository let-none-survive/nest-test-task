import { IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  readonly startOrderDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  readonly endOrderDate: Date;

  @ApiProperty()
  @IsNumber()
  readonly room_id: number;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;
}
