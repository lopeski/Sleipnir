import { Injectable } from '@nestjs/common';
import {
  ICreatePostUsecase,
  ICreatePostUsecaseUsecaseInput,
  ICreatePostUsecaseUsecaseOutput,
} from '@core/providers/core/i.create.post.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';
import { IPostRepository } from '@core/providers/infra/i.post.repository';

@Injectable()
export class CreatePostUsecase implements ICreatePostUsecase {
  constructor(private readonly _postRepository: IPostRepository) {}

  async execute(
    input: ICreatePostUsecaseUsecaseInput,
  ): Promise<ICreatePostUsecaseUsecaseOutput> {
    return await this._postRepository.create(input);
  }
}
