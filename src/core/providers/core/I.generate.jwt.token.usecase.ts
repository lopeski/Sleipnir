import { UseCase } from '@core/providers/core/use-case';

export interface IGenerateJwttokenUsecaseUsecaseInput {
  username: string;
  role: string;
}

export interface IGenerateJwttokenUsecaseUsecaseOutput {
  access_token: string;
}

export abstract class IGenerateJwtTokenUsecase
  implements
    UseCase<
      IGenerateJwttokenUsecaseUsecaseInput,
      Promise<IGenerateJwttokenUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: IGenerateJwttokenUsecaseUsecaseInput,
  ): Promise<IGenerateJwttokenUsecaseUsecaseOutput>;
}
