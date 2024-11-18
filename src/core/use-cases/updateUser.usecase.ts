import { Injectable } from '@nestjs/common';
import {
  IUpdateUserUsecase,
  IUpdateUserUsecaseUsecaseInput,
  IUpdateUserUsecaseUsecaseOutput,
} from '@core/providers/core/i.updateUser.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';

@Injectable()
export class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(
    input: IUpdateUserUsecaseUsecaseInput,
  ): Promise<IUpdateUserUsecaseUsecaseOutput> {
    return await this._userRepository.findAndUpdate(input);
  }
}
