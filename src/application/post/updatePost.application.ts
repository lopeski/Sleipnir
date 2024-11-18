import { HttpException, Injectable } from '@nestjs/common';
import {
  IUpdatePostApplication,
  IUpdatePostApplicationInput,
  IUpdatePostApplicationOutput,
} from '@core/providers/application/i.updatePost.application';
import { IUpdatePostUsecase } from '@core/providers/core/i.updatePost.usecase';

@Injectable()
export class UpdatePostApplication implements IUpdatePostApplication {
  constructor(private readonly _updatePostUsecase: IUpdatePostUsecase) {}

  async execute(
    input: IUpdatePostApplicationInput,
  ): Promise<IUpdatePostApplicationOutput> {
    try {
      return await this._updatePostUsecase.execute(input);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
