import { UseCase } from '@core/providers/core/use-case';

export interface IUpdateUserUsecaseUsecaseInput {
  id: number;
  payload: UpdateUserData;
}
export interface UpdateUserData {
  username: string;
  password: string;
  role: string;
}

export type IUpdateUserUsecaseUsecaseOutput = void;

export abstract class IUpdateUserUsecase
  implements
    UseCase<
      IUpdateUserUsecaseUsecaseInput,
      Promise<IUpdateUserUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: IUpdateUserUsecaseUsecaseInput,
  ): Promise<IUpdateUserUsecaseUsecaseOutput>;
}
