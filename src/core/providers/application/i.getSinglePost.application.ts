import { IBaseApplication } from '@core/providers/application/base.application';

export interface IGetSinglePostApplicationInput {
  id: number;
}

export interface IGetSinglePostApplicationOutput {
  id: number;
  title: string;
  body: string;
  owner: string;
}

export abstract class IGetSinglePostApplication
  implements
    IBaseApplication<
      IGetSinglePostApplicationInput,
      Promise<IGetSinglePostApplicationOutput>
    >
{
  abstract execute(
    input: IGetSinglePostApplicationInput,
  ): Promise<IGetSinglePostApplicationOutput>;
}
