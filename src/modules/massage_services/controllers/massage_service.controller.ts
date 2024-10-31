import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MassageServicesService } from '../services/massage_services.service';

@Controller('massageService')
export class MassageServiceController {
  constructor(
    private readonly massageServicesService: MassageServicesService,
  ) {}

  @Post()
  async createMassageService(@Body() person: any) {
    console.log(person);
    return this.massageServicesService.createMassageService(person);
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
