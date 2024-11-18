import { HttpException, Injectable } from '@nestjs/common';
import {
  IDeleteUserApplication,
  IDeleteUserApplicationInput,
  IDeleteUserApplicationOutput,
} from '@core/providers/application/i.deleteUser.application';
import { IDeleteUserUsecase } from '@core/providers/core/i.deleteUser.usecase';

@Injectable()
export class DeleteUserApplication implements IDeleteUserApplication {
  constructor(private readonly _deleteUserUsecase: IDeleteUserUsecase) {}

  async execute(
    input: IDeleteUserApplicationInput,
  ): Promise<IDeleteUserApplicationOutput> {
    try {
      return await this._deleteUserUsecase.execute(input);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
