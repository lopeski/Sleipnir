import { UseCase } from '@core/providers/core/use-case';

export interface IGetSinglePostUsecaseUsecaseInput {
  id: number;
}

export interface IGetSinglePostUsecaseUsecaseOutput {
  id: number;
  title: string;
  body: string;
  owner: string;
}

export abstract class IGetSinglePostUsecase
  implements
    UseCase<
      IGetSinglePostUsecaseUsecaseInput,
      Promise<IGetSinglePostUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: IGetSinglePostUsecaseUsecaseInput,
  ): Promise<IGetSinglePostUsecaseUsecaseOutput>;
}
