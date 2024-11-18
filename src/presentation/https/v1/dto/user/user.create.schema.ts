import { IsIn, IsString } from 'class-validator';

export class UserCreateSchemaInput {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsIn(['Admin', 'Editor', 'Reader'])
  role: 'Admin' | 'Editor' | 'Reader';
}

export class UserCreateSchemaOutput {}
