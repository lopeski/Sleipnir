import { UseCase } from '@core/providers/core/use-case';

export interface IGetSingleUserUsecaseUsecaseInput {
  id: number;
}

export interface IGetSingleUserUsecaseUsecaseOutput {
  id: number;
  username: string;
  role: string;
}

export abstract class IGetSingleUserUsecase
  implements
    UseCase<
      IGetSingleUserUsecaseUsecaseInput,
      Promise<IGetSingleUserUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: IGetSingleUserUsecaseUsecaseInput,
  ): Promise<IGetSingleUserUsecaseUsecaseOutput>;
}
