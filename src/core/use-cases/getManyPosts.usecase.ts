import { Injectable } from '@nestjs/common';
import {
  IGetManyPostsUsecase,
  IGetManyPostsUsecaseUsecaseInput,
  IGetManyPostsUsecaseUsecaseOutput,
} from '@core/providers/core/i.getManyPosts.usecase';
import { IPostRepository } from '@core/providers/infra/i.post.repository';

@Injectable()
export class GetManyPostsUsecase implements IGetManyPostsUsecase {
  constructor(private readonly _postRepository: IPostRepository) {}

  async execute(
    input: IGetManyPostsUsecaseUsecaseInput,
  ): Promise<IGetManyPostsUsecaseUsecaseOutput[]> {
    return await this._postRepository.findAll(input);
  }
}
