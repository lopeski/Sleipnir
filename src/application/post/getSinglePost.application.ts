import { HttpException, Injectable } from '@nestjs/common';
import {
  IGetSinglePostApplication,
  IGetSinglePostApplicationInput,
  IGetSinglePostApplicationOutput,
} from '@core/providers/application/i.getSinglePost.application';
import { IGetSinglePostUsecase } from '@core/providers/core/i.getSinglePost.usecase';

@Injectable()
export class GetSinglePostApplication implements IGetSinglePostApplication {
  constructor(private readonly _getSinglePostUsecase: IGetSinglePostUsecase) {}

  async execute(
    input: IGetSinglePostApplicationInput,
  ): Promise<IGetSinglePostApplicationOutput> {
    try {
      return await this._getSinglePostUsecase.execute(input);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
