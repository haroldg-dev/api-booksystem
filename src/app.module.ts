import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './modules/person/person.module';
import { MassageServiceModule } from './modules/massage_services/massage_services.module';
import { BookingModule } from './modules/booking/booking.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PersonModule,
    BookingModule,
    PaymentModule,
    MassageServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
