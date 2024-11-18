import { Injectable } from '@nestjs/common';
import {
  ICreateHashPasswordUsecase,
  ICreateHashPasswordUsecaseUsecaseInput,
  ICreateHashPasswordUsecaseUsecaseOutput,
} from '@core/providers/core/i.createHashPassword.usecase';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CreateHashPasswordUsecase implements ICreateHashPasswordUsecase {
  constructor() {}

  async execute(
    input: ICreateHashPasswordUsecaseUsecaseInput,
  ): Promise<ICreateHashPasswordUsecaseUsecaseOutput> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(input, salt);
  }
}
