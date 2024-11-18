import { HttpException, Injectable } from '@nestjs/common';
import {
  ICreateUserApplication,
  ICreateUserApplicationInput,
  ICreateUserApplicationOutput,
} from '@core/providers/application/i.createUser.application';
import { ICreateUserUsecase } from '@core/providers/core/i.createUser.usecase';
import { ICreateHashPasswordUsecase } from '@core/providers/core/i.createHashPassword.usecase';

@Injectable()
export class CreateUserApplication implements ICreateUserApplication {
  constructor(
    private readonly _createUserUsecase: ICreateUserUsecase,
    private readonly _createHashPasswordUsecase: ICreateHashPasswordUsecase,
  ) {}

  async execute(
    input: ICreateUserApplicationInput,
  ): Promise<ICreateUserApplicationOutput> {
    try {
      const hashPassword = await this._createHashPasswordUsecase.execute(
        input.password,
      );
      const data = {
        ...input,
        password: hashPassword,
      };
      return await this._createUserUsecase.execute(data);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
