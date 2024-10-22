import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';

@Module({
  imports: [PersonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
