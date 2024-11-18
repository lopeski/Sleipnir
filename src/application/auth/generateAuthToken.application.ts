import { HttpException, Injectable } from '@nestjs/common';
import {
  IGenerateAuthTokenApplication,
  IGenerateAuthTokenApplicationInput,
  IGenerateAuthTokenApplicationOutput,
} from '@core/providers/application/i.generateAuthToken.application';
import { IGenerateJwtTokenUsecase } from '@core/providers/core/I.generate.jwt.token.usecase';
import { IFindUserRoleUsecase } from '@core/providers/core/i.findUserRole.usecase';

@Injectable()
export class GenerateAuthTokenApplication
  implements IGenerateAuthTokenApplication
{
  constructor(
    private readonly _findUserRoleUsecase: IFindUserRoleUsecase,
    private readonly _generateJwtTokenUseCase: IGenerateJwtTokenUsecase,
  ) {}

  async execute(
    input: IGenerateAuthTokenApplicationInput,
  ): Promise<IGenerateAuthTokenApplicationOutput> {
    try {
      const user = await this._findUserRoleUsecase.execute(input);
      return this._generateJwtTokenUseCase.execute({
        username: input.username,
        role: user,
      });
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
