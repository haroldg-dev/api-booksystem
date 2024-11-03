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
import { PersonService } from '../services/person.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new person' })
  @ApiResponse({ status: 201, description: 'Person created successfully.' })
  @ApiResponse({ status: 404, description: 'Bad Request.' })
  async createPerson(@Body(ValidationPipe) person: CreatePersonDto) {
    return this.personService.createPerson(person);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a person by ID' })
  @ApiResponse({
    status: 200,
    description: 'Person data returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  async getPerson(@Param('id') id: string) {
    return this.personService.getPerson(id);
  }

  @Get()
  async getAllPerson() {
    return this.personService.getAllPersons();
  }

  @Put(':id')
  async updatePerson(@Param('id') id: string, @Body() updateData: any) {
    return this.personService.updatePerson(id, updateData);
  }

  @Delete(':id')
  async deletePerson(@Param('id') id: string) {
    return this.personService.deletePerson(id);
  }
}
