import { IBaseApplication } from '@core/providers/application/base.application';

export interface IDeletePostApplicationInput {
  id: number;
}

export type IDeletePostApplicationOutput = void;

export abstract class IDeletePostApplication
  implements
    IBaseApplication<
      IDeletePostApplicationInput,
      Promise<IDeletePostApplicationOutput>
    >
{
  abstract execute(
    input: IDeletePostApplicationInput,
  ): Promise<IDeletePostApplicationOutput>;
}
