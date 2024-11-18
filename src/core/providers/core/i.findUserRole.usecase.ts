import { UseCase } from '@core/providers/core/use-case';

export interface IFindUserRoleUsecaseUsecaseInput {
  username: string;
  password: string;
}

export type IFindUserRoleUsecaseUsecaseOutput = string;

export abstract class IFindUserRoleUsecase
  implements
    UseCase<
      IFindUserRoleUsecaseUsecaseInput,
      Promise<IFindUserRoleUsecaseUsecaseOutput>
    >
{
  abstract execute(
    input: IFindUserRoleUsecaseUsecaseInput,
  ): Promise<IFindUserRoleUsecaseUsecaseOutput>;
}
