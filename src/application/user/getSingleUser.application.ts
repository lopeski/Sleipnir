import { HttpException, Injectable } from '@nestjs/common';
import {
  IGetSingleUserApplication,
  IGetSingleUserApplicationInput,
  IGetSingleUserApplicationOutput,
} from '@core/providers/application/i.getSingleUser.application';
import { IGetSingleUserUsecase } from '@core/providers/core/i.getSingleUser.usecase';
import { GetSingleUserAdapter } from '@application/user/adapter/get.single.user.adapter';

@Injectable()
export class GetSingleUserApplication implements IGetSingleUserApplication {
  constructor(private readonly _getSingleUser: IGetSingleUserUsecase) {}

  async execute(
    input: IGetSingleUserApplicationInput,
  ): Promise<IGetSingleUserApplicationOutput> {
    try {
      const user = await this._getSingleUser.execute(input);
      return GetSingleUserAdapter.domainToRequest(user);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
