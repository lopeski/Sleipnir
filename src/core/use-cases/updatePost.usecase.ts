import { Injectable } from '@nestjs/common';
import {
  IUpdatePostUsecase,
  IUpdatePostUsecaseUsecaseInput,
  IUpdatePostUsecaseUsecaseOutput,
} from '@core/providers/core/i.updatePost.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';
import { IPostRepository } from '@core/providers/infra/i.post.repository';

@Injectable()
export class UpdatePostUsecase implements IUpdatePostUsecase {
  constructor(private readonly _postRepository: IPostRepository) {}

  async execute(
    input: IUpdatePostUsecaseUsecaseInput,
  ): Promise<IUpdatePostUsecaseUsecaseOutput> {
    return await this._postRepository.findAndUpdate(input);
  }
}
