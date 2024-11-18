import { UseCase } from '@core/providers/core/use-case';

export type ICreateHashPasswordUsecaseUsecaseInput = string;

export type ICreateHashPasswordUsecaseUsecaseOutput = string;

export abstract class ICreateHashPasswordUsecase
  implements
    UseCase<
      ICreateHashPasswordUsecaseUsecaseInput,
      Promise<ICreateHashPasswordUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: ICreateHashPasswordUsecaseUsecaseInput,
  ): Promise<ICreateHashPasswordUsecaseUsecaseOutput>;
}
