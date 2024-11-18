import { Injectable } from '@nestjs/common';
import {
  IGetSinglePostUsecase,
  IGetSinglePostUsecaseUsecaseInput,
  IGetSinglePostUsecaseUsecaseOutput,
} from '@core/providers/core/i.getSinglePost.usecase';
import { IPostRepository } from '@core/providers/infra/i.post.repository';

@Injectable()
export class GetSinglePostUsecase implements IGetSinglePostUsecase {
  constructor(private readonly _postRepository: IPostRepository) {}

  async execute(
    input: IGetSinglePostUsecaseUsecaseInput,
  ): Promise<IGetSinglePostUsecaseUsecaseOutput> {
    return await this._postRepository.findOne(input.id);
  }
}
