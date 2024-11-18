import { UseCase } from '@core/providers/core/use-case';

export interface IUpdatePostUsecaseUsecaseInput {
  id: number;
  payload: UpdatePostData;
}
export interface UpdatePostData {
  title: string;
  body: string;
}
export type IUpdatePostUsecaseUsecaseOutput = void;

export abstract class IUpdatePostUsecase
  implements
    UseCase<
      IUpdatePostUsecaseUsecaseInput,
      Promise<IUpdatePostUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: IUpdatePostUsecaseUsecaseInput,
  ): Promise<IUpdatePostUsecaseUsecaseOutput>;
}
