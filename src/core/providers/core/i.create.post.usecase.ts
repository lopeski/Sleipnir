import { UseCase } from '@core/providers/core/use-case';

export interface ICreatePostUsecaseUsecaseInput {
  title: string;
  body: string;
  owner: string;
}

export type ICreatePostUsecaseUsecaseOutput = void;

export abstract class ICreatePostUsecase
  implements
    UseCase<
      ICreatePostUsecaseUsecaseInput,
      Promise<ICreatePostUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: ICreatePostUsecaseUsecaseInput,
  ): Promise<ICreatePostUsecaseUsecaseOutput>;
}
