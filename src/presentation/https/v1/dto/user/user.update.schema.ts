import { IsIn, IsOptional, IsString } from 'class-validator';

export class UserUpdateSchemaInput {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsIn(['Admin', 'Editor', 'Reader'])
  role: 'Admin' | 'Editor' | 'Reader';
}
