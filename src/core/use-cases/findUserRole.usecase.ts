import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IFindUserRoleUsecase,
  IFindUserRoleUsecaseUsecaseInput,
  IFindUserRoleUsecaseUsecaseOutput,
} from '@core/providers/core/i.findUserRole.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class FindUserRoleUsecase implements IFindUserRoleUsecase {
  constructor(private readonly _userRepository: IUserRepository) {}

  async execute(
    input: IFindUserRoleUsecaseUsecaseInput,
  ): Promise<IFindUserRoleUsecaseUsecaseOutput> {
    const user = await this._userRepository.findUserByUsername(input.username);

    if (!user) {
      throw new UnauthorizedException('Usuario não AUTORIZADO');
    }

    return await bcrypt
      .compare(input.password, user.password)
      .then((response) => {
        if (response) {
          return user.role;
        }
        throw new UnauthorizedException('Usuario não AUTORIZADO');
      })
      .catch(() => {
        throw new UnauthorizedException('Usuario não AUTORIZADO');
      });
  }
}
