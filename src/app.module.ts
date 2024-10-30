import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './modules/person/person.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PersonModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
