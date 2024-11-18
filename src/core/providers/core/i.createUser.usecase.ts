import { UseCase } from '@core/providers/core/use-case';

export interface ICreateUserUsecaseUsecaseInput {
  username: string;
  password: string;
  role: 'Admin' | 'Editor' | 'Reader';
}

export type ICreateUserUsecaseUsecaseOutput = void;

export abstract class ICreateUserUsecase
  implements
    UseCase<
      ICreateUserUsecaseUsecaseInput,
      Promise<ICreateUserUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: ICreateUserUsecaseUsecaseInput,
  ): Promise<ICreateUserUsecaseUsecaseOutput>;
}
