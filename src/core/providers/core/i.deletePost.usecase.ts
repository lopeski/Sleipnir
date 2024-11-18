import { UseCase } from '@core/providers/core/use-case';

export interface IDeletePostUsecaseUsecaseInput {
  id: number;
}

export type IDeletePostUsecaseUsecaseOutput = void;

export abstract class IDeletePostUsecase
  implements
    UseCase<
      IDeletePostUsecaseUsecaseInput,
      Promise<IDeletePostUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: IDeletePostUsecaseUsecaseInput,
  ): Promise<IDeletePostUsecaseUsecaseOutput>;
}
