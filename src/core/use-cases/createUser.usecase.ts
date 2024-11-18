import { Injectable } from '@nestjs/common';
import {
  ICreateUserUsecase,
  ICreateUserUsecaseUsecaseInput,
  ICreateUserUsecaseUsecaseOutput,
} from '@core/providers/core/i.createUser.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';

@Injectable()
export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(
    input: ICreateUserUsecaseUsecaseInput,
  ): Promise<ICreateUserUsecaseUsecaseOutput> {
    return await this._userRepository.create(input);
  }
}
