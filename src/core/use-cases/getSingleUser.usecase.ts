import { Injectable } from '@nestjs/common';
import {
  IGetSingleUserUsecase,
  IGetSingleUserUsecaseUsecaseInput,
  IGetSingleUserUsecaseUsecaseOutput,
} from '@core/providers/core/i.getSingleUser.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';

@Injectable()
export class GetSingleUserUsecase implements IGetSingleUserUsecase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(
    input: IGetSingleUserUsecaseUsecaseInput,
  ): Promise<IGetSingleUserUsecaseUsecaseOutput> {
    return await this._userRepository.findOne(input.id);
  }
}
