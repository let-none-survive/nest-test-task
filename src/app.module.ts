import { Module } from '@nestjs/common';
import { ReservationModule } from 'src/reservation/reservation.module';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { HotelRoomsModule } from './hotel-rooms/hotel-rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    HotelRoomsModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
