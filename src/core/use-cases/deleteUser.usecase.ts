import { Injectable } from '@nestjs/common';
import {
  IDeleteUserUsecase,
  IDeleteUserUsecaseUsecaseInput,
  IDeleteUserUsecaseUsecaseOutput,
} from '@core/providers/core/i.deleteUser.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';

@Injectable()
export class DeleteUserUsecase implements IDeleteUserUsecase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(
    input: IDeleteUserUsecaseUsecaseInput,
  ): Promise<IDeleteUserUsecaseUsecaseOutput> {
    return await this._userRepository.remove(input.id);
  }
}
