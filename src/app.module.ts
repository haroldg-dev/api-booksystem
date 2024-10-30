import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [PersonModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
