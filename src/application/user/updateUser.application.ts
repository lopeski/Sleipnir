import { HttpException, Injectable } from '@nestjs/common';
import {
  IUpdateUserApplication,
  IUpdateUserApplicationInput,
  IUpdateUserApplicationOutput,
} from '@core/providers/application/i.updateUser.application';
import { IUpdateUserUsecase } from '@core/providers/core/i.updateUser.usecase';

@Injectable()
export class UpdateUserApplication implements IUpdateUserApplication {
  constructor(private readonly _updateUserUsecase: IUpdateUserUsecase) {}

  async execute(
    input: IUpdateUserApplicationInput,
  ): Promise<IUpdateUserApplicationOutput> {
    try {
      return await this._updateUserUsecase.execute(input);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
