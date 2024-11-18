import { HttpException, Injectable } from '@nestjs/common';
import {
  IGetManyPostsApplication,
  IGetManyPostsApplicationInput,
  IGetManyPostsApplicationOutput,
} from '@core/providers/application/i.getManyPosts.application';
import { IGetManyPostsUsecase } from '@core/providers/core/i.getManyPosts.usecase';

@Injectable()
export class GetManyPostsApplication implements IGetManyPostsApplication {
  constructor(private readonly _getManyPostsUsecase: IGetManyPostsUsecase) {}

  async execute(
    input: IGetManyPostsApplicationInput,
  ): Promise<IGetManyPostsApplicationOutput[]> {
    try {
      return await this._getManyPostsUsecase.execute(input);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
