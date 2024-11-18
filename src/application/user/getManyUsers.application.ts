import { HttpException, Injectable } from '@nestjs/common';
import {
  IGetManyUsersApplication,
  IGetManyUsersApplicationInput,
  IGetManyUsersApplicationOutput,
} from '@core/providers/application/i.getManyUsers.application';
import { IGetManyUsersUsecase } from '@core/providers/core/i..get.many.users.usecase';

@Injectable()
export class GetManyUsersApplication implements IGetManyUsersApplication {
  constructor(private readonly _getManyUsersUsecase: IGetManyUsersUsecase) {}

  async execute(
    input: IGetManyUsersApplicationInput,
  ): Promise<IGetManyUsersApplicationOutput[]> {
    try {
      return await this._getManyUsersUsecase.execute(input);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
