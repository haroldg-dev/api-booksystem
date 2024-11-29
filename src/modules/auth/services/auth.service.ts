import { HttpException, Injectable } from '@nestjs/common';
import { PersonService } from 'src/modules/person/services/person.service';

@Injectable()
export class AuthService {
  constructor(private readonly personService: PersonService) {}

  async login(entity: any) {
    const user: any = await this.personService.getPersonByEmail(entity.email);

    if (user) {
      console.log(user);
      const matched = user.password == entity.password ? true : false;
      if (matched) {
        return {
          status: 200,
          payload: {
            userId: user.person_id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          },
        };
      }
      throw new HttpException('PASSWORD INCORRECT', 409);
    }
    throw new HttpException('WRONG USER', 409);
  }
}
