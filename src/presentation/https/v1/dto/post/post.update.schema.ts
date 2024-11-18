import { IsOptional, IsString } from 'class-validator';

export class PostUpdateSchemaInput {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  body: string;
}
