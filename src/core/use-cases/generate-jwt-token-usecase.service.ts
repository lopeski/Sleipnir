import { Injectable } from '@nestjs/common';
import {
  IGenerateJwtTokenUsecase,
  IGenerateJwttokenUsecaseUsecaseInput,
  IGenerateJwttokenUsecaseUsecaseOutput,
} from '@core/providers/core/I.generate.jwt.token.usecase';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GenerateJwtTokenUsecase implements IGenerateJwtTokenUsecase {
  constructor() {}

  async execute(
    input: IGenerateJwttokenUsecaseUsecaseInput,
  ): Promise<IGenerateJwttokenUsecaseUsecaseOutput> {
    const payload = {
      username: input.username,
      role: input.role,
    };

    return {
      access_token: jwt.sign(
        payload,
        process.env.JWT_SECRET || 'D647EF968BA73FF93946ABF267587',
      ),
    };
  }
}
