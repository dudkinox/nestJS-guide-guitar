import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserEmployeeDto } from './createUserEmployee.dto';

export class UpdateUserEmployeeDto extends PartialType(CreateUserEmployeeDto) {
  @ApiProperty({
    description: 'is_active',
    example: true,
  })
  is_active: boolean;
}
