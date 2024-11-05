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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { MassageServicesService } from '../services/massage_services.service';
import { CreateMassageServiceDto } from '../dto/create-massage-service.dto';

@ApiTags('massageService') // Adds a tag to group all MassageService endpoints
@Controller('massageService')
export class MassageServiceController {
  constructor(
    private readonly massageServicesService: MassageServicesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new massage service' })
  @ApiBody({ type: CreateMassageServiceDto })
  @ApiResponse({
    status: 201,
    description: 'The massage service has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async createMassageService(
    @Body(ValidationPipe) massage_service: CreateMassageServiceDto,
  ) {
    console.log(massage_service);
    return this.massageServicesService.createMassageService(massage_service);
  }

  @Get()
  @ApiOperation({ summary: 'Get all massage services' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all massage services.',
  })
  async getAllMassageService() {
    return this.massageServicesService.getAllMassageServices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a massage service by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the massage service to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the massage service with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Massage service not found.' })
  async getMassageService(@Param('id') id: string) {
    return this.massageServicesService.getMassageService(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a massage service by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the massage service to update',
  })
  @ApiBody({
    type: CreateMassageServiceDto,
    description: 'Data to update the massage service',
  })
  @ApiResponse({
    status: 200,
    description: 'The massage service has been updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Massage service not found.' })
  async updateMassageService(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateMassageServiceDto>,
  ) {
    return this.massageServicesService.updateMassageService(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a massage service by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the massage service to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The massage service has been deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Massage service not found.' })
  async deleteMassageService(@Param('id') id: string) {
    return this.massageServicesService.deleteMassageService(id);
  }
}
