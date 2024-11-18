import { HttpException, Injectable } from '@nestjs/common';
import {
  ICreatePostApplication,
  ICreatePostApplicationInput,
  ICreatePostApplicationOutput,
} from '@core/providers/application/i.create.post.application';
import { ICreatePostUsecase } from '@core/providers/core/i.create.post.usecase';

@Injectable()
export class CreatePostApplication implements ICreatePostApplication {
  constructor(private readonly _createPostUsecase: ICreatePostUsecase) {}

  async execute(
    input: ICreatePostApplicationInput,
  ): Promise<ICreatePostApplicationOutput> {
    try {
      return await this._createPostUsecase.execute(input);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
