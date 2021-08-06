import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAvailableRoomsDto {
  @ApiProperty()
  @Type((type) => Date)
  @IsDate()
  readonly startDate: string;

  @ApiProperty()
  @Type((type) => Date)
  @IsDate()
  readonly endDate: string;
}
