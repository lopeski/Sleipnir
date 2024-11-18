import { UseCase } from '@core/providers/core/use-case';

export type IGetManyPostsUsecaseUsecaseInput = void;

export interface IGetManyPostsUsecaseUsecaseOutput {
  id: number;
  title: string;
  body: string;
  owner: string;
}

export abstract class IGetManyPostsUsecase
  implements
    UseCase<
      IGetManyPostsUsecaseUsecaseInput,
      Promise<IGetManyPostsUsecaseUsecaseOutput[]>
    >
{
  abstract execute(
    input: IGetManyPostsUsecaseUsecaseInput,
  ): Promise<IGetManyPostsUsecaseUsecaseOutput[]>;
}
