import { Injectable } from '@nestjs/common';
import {
  IDeletePostUsecase,
  IDeletePostUsecaseUsecaseInput,
  IDeletePostUsecaseUsecaseOutput,
} from '@core/providers/core/i.deletePost.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';
import { IPostRepository } from '@core/providers/infra/i.post.repository';

@Injectable()
export class DeletePostUsecase implements IDeletePostUsecase {
  constructor(private readonly _postRepository: IPostRepository) {}

  async execute(
    input: IDeletePostUsecaseUsecaseInput,
  ): Promise<IDeletePostUsecaseUsecaseOutput> {
    return await this._postRepository.remove(input.id);
  }
}
