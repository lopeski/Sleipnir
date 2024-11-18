import { UseCase } from '@core/providers/core/use-case';

export interface IDeleteUserUsecaseUsecaseInput {
  id: number;
}

export type IDeleteUserUsecaseUsecaseOutput = void;

export abstract class IDeleteUserUsecase
  implements
    UseCase<
      IDeleteUserUsecaseUsecaseInput,
      Promise<IDeleteUserUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: IDeleteUserUsecaseUsecaseInput,
  ): Promise<IDeleteUserUsecaseUsecaseOutput>;
}
