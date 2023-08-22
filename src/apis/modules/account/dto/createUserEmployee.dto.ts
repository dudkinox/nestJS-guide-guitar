import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { Prefix } from 'src/model/enum/user.enum';

enum Gender {
  'Male' = 'Male',
  'Female' = 'Female',
}

enum EmployeeType {
  'Monthly' = 'Monthly',
  'Daily' = 'Daily',
  'Hourly' = 'Hourly',
}

enum EmployeeLevel {
  'Highest' = 'Highest',
  'High' = 'High',
  'Middle' = 'Middle',
  'Low' = 'Low',
}

export class CreateUserEmployeeDto {
  @ApiProperty({ description: 'projects_id', example: ['mongo_id'] })
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  projects_id: string[];

  @ApiProperty({ description: 'card_number', example: '123456' })
  @IsNotEmpty()
  card_number: string;

  @ApiProperty({ description: 'email', example: 'test@test.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'employee_number', example: '1234567' })
  @IsNotEmpty()
  employee_number: string;

  @ApiProperty({ description: 'fname_th', example: 'ทดสอบ' })
  @IsNotEmpty()
  fname_th: string;

  @ApiProperty({ description: 'lname_th', example: 'ทดสอบนามสกุล' })
  @IsNotEmpty()
  lname_th: string;

  @ApiProperty({ description: 'fname_en', example: 'test' })
  fname_en: string;

  @ApiProperty({ description: 'lname_en', example: 'lastname' })
  lname_en: string;

  @ApiProperty({ description: 'gender', example: 'Male, Female' })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({ description: 'id_card', example: '1234567891011' })
  @IsNotEmpty()
  @Length(13, 13)
  id_card: string;

  @ApiProperty({ description: 'password', example: '123456' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'prefix', example: 'นาย, นาง, นางสาว, อื่นๆ' })
  @IsEnum(Prefix)
  prefix: string;

  @ApiProperty({ description: 'other_prefix', example: 'test' })
  other_prefix: string;

  @ApiProperty({ description: 'phone', example: '0811111111' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'role_id', example: '_id of role' })
  @IsOptional()
  @IsMongoId()
  role_id: string;

  @ApiProperty({
    description: 'department_id',
    example: 'mongo_id',
  })
  department_id: string;

  @ApiProperty({ description: 'section_id', example: 'mongo_id' })
  section_id: string;

  @ApiProperty({ description: 'position_id', example: 'mongo_id' })
  position_id: string;

  @ApiProperty({ description: 'approver_person', example: 'test' })
  approver_person: string;

  @ApiProperty({
    description: 'employee_level',
    example: 'Highest, High, Middle, Low',
  })
  @IsEnum(EmployeeLevel)
  employee_level: string;

  @ApiProperty({
    description: 'employee_type',
    example: 'Monthly, Daily, Hourly',
  })
  @IsEnum(EmployeeType)
  employee_type: string;

  @ApiProperty({
    description: 'hired_date',
    example: '2023-05-15T02:57:10.728Z',
  })
  hired_date: Date;
  @ApiProperty({
    description: 'packing_date',
    example: '2023-05-15T02:57:10.728Z',
  })
  packing_date: Date;
  @ApiProperty({
    description: 'release_date',
    example: '2023-05-15T02:57:10.728Z',
  })
  release_date: Date;
  @ApiProperty({ description: 'holiday_group_id', example: '' })
  holiday_group_id: number;
  @ApiProperty({ description: 'account_number', example: '' })
  account_number: string;
  @ApiProperty({ description: 'bank_id', example: '' })
  bank_id: number;
  @ApiProperty({ description: 'work_time_id', example: '' })
  work_time_id: number;
  @ApiProperty({ description: 'workplace_id', example: '' })
  workplace_id: number;
}
