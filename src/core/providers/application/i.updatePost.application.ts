import { IBaseApplication } from '@core/providers/application/base.application';

export interface IUpdatePostApplicationInput {
  id: number;
  payload: UpdatePostData;
}

export interface UpdatePostData {
  title: string;
  body: string;
}

export type IUpdatePostApplicationOutput = void;

export abstract class IUpdatePostApplication
  implements
    IBaseApplication<
      IUpdatePostApplicationInput,
      Promise<IUpdatePostApplicationOutput>
    >
{
  abstract execute(
    input: IUpdatePostApplicationInput,
  ): Promise<IUpdatePostApplicationOutput>;
}
