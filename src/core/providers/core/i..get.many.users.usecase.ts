import { UseCase } from '@core/providers/core/use-case';

export type IGetManyUsersUsecaseUsecaseInput = void;

export interface IGetManyUsersUsecaseUsecaseOutput {
  id: number;
  username: string;
  role: string;
}

export abstract class IGetManyUsersUsecase
  implements
    UseCase<
      IGetManyUsersUsecaseUsecaseInput,
      Promise<IGetManyUsersUsecaseUsecaseOutput[]>
    >
{
  abstract execute(
    input: IGetManyUsersUsecaseUsecaseInput,
  ): Promise<IGetManyUsersUsecaseUsecaseOutput[]>;
}
