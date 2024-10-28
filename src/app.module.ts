import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { MassageServiceModule } from './modules/massage_services/massage_services.module';

@Module({
  imports: [PersonModule, MassageServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
