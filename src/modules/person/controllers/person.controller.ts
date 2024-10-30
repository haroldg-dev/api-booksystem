import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PersonService } from '../services/person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async createPerson(@Body() person: any) {
    return this.personService.createPerson(person);
  }

  @Get(':id')
  async getPerson(@Param('id') id: string) {
    return this.personService.getPerson(id);
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
