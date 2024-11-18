import { Controller, Post } from '@nestjs/common';
import { IsPublic } from '@presentation/auth/decorators/securet.decorators';
import { IGenerateAuthTokenApplication } from '@core/providers/application/i.generateAuthToken.application';
import { basicAuth } from '@presentation/auth/decorators/basic.auth.decorator';
import {
  LoginDtoInput,
  LoginDtoOutput,
} from '@presentation/https/v1/dto/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _generateAuthTokenApplication: IGenerateAuthTokenApplication,
  ) {}

  @Post()
  @IsPublic()
  async login(@basicAuth() input: LoginDtoInput): Promise<LoginDtoOutput> {
    return await this._generateAuthTokenApplication.execute(input);
  }
}
