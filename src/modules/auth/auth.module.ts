import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [PersonModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
