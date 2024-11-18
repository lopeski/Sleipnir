import { IBaseApplication } from '@core/providers/application/base.application';

export interface ICreatePostApplicationInput {
  title: string;
  body: string;
  owner: string;
}

export type ICreatePostApplicationOutput = void;

export abstract class ICreatePostApplication
  implements
    IBaseApplication<
      ICreatePostApplicationInput,
      Promise<ICreatePostApplicationOutput>
    >
{
  abstract execute(
    input: ICreatePostApplicationInput,
  ): Promise<ICreatePostApplicationOutput>;
}
