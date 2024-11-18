import { Injectable } from '@nestjs/common';
import {
  IGetManyUsersUsecase,
  IGetManyUsersUsecaseUsecaseInput,
  IGetManyUsersUsecaseUsecaseOutput,
} from '@core/providers/core/i..get.many.users.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';

@Injectable()
export class GetManyUsersUsecase implements IGetManyUsersUsecase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(
    input: IGetManyUsersUsecaseUsecaseInput,
  ): Promise<IGetManyUsersUsecaseUsecaseOutput[]> {
    return await this._userRepository.findAll(input);
  }
}
