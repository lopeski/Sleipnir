import { HttpException, Injectable } from '@nestjs/common';
import {
  IDeletePostApplication,
  IDeletePostApplicationInput,
  IDeletePostApplicationOutput,
} from '@core/providers/application/i.deletePost.application';
import { IDeletePostUsecase } from '@core/providers/core/i.deletePost.usecase';

@Injectable()
export class DeletePostApplication implements IDeletePostApplication {
  constructor(private readonly _deletePostUsecase: IDeletePostUsecase) {}

  async execute(
    input: IDeletePostApplicationInput,
  ): Promise<IDeletePostApplicationOutput> {
    try {
      return await this._deletePostUsecase.execute(input);
    } catch (e) {
      throw new HttpException(e.message, e.status || 412);
    }
  }
}
