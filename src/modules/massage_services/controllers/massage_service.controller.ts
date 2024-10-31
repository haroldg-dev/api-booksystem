import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { MassageServicesService } from '../services/massage_services.service';
import { CreateMassageServiceDto } from '../dto/create-massage-service.dto';

@Controller('massageService')
export class MassageServiceController {
  constructor(
    private readonly massageServicesService: MassageServicesService,
  ) {}

  @Post()
  async createMassageService(
    @Body(ValidationPipe) massage_service: CreateMassageServiceDto,
  ) {
    console.log(massage_service);
    return this.massageServicesService.createMassageService(massage_service);
  }

  @Get()
  async getAllMassageService() {
    return this.massageServicesService.getAllMassageServices();
  }

  @Get(':id')
  async getMassageService(@Param('id') id: string) {
    return this.massageServicesService.getMassageService(id);
  }

  @Put(':id')
  async updateMassageService(@Param('id') id: string, @Body() updateData: any) {
    return this.massageServicesService.updateMassageService(id, updateData);
  }

  @Delete(':id')
  async deleteMassageService(@Param('id') id: string) {
    return this.massageServicesService.deleteMassageService(id);
  }
}
