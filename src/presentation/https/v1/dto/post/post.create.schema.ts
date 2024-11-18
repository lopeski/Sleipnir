import { IsString } from 'class-validator';

export class PostCreateSchemaInput {
  @IsString()
  title: string;

  @IsString()
  body: string;
}
