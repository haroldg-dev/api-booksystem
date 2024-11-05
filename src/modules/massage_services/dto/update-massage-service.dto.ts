import { PartialType } from '@nestjs/mapped-types';
import { CreateMassageServiceDto } from './create-massage-service.dto';

export class UpdateMassageServiceDto extends PartialType(
  CreateMassageServiceDto,
) {}
