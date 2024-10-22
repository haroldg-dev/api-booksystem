import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';

@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  findAll() {
    // TODO - LOGIC
    return `This action returns all person`;
  }

  findRandom() {
    // TODO - LOGIC
    return `This action returns random`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
