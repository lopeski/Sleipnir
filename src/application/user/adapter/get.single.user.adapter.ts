import { IGetSingleUserUsecaseUsecaseOutput } from '@core/providers/core/i.getSingleUser.usecase';
import { IGetSingleUserApplicationOutput } from '@core/providers/application/i.getSingleUser.application';

export class GetSingleUserAdapter {
  static domainToRequest(
    input: IGetSingleUserUsecaseUsecaseOutput,
  ): IGetSingleUserApplicationOutput {
    return {
      id: input.id,
      username: input.username,
      role: input.role,
    };
  }
}
