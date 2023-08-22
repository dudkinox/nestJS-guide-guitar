import { IsOptional } from 'class-validator';

export class UserQuery {
  @IsOptional()
  projects_id: string;
}
