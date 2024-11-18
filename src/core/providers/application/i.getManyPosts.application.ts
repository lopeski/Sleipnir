import { IBaseApplication } from '@core/providers/application/base.application';

export type IGetManyPostsApplicationInput = void;

export interface IGetManyPostsApplicationOutput {
  id: number;
  title: string;
  body: string;
  owner: string;
}

export abstract class IGetManyPostsApplication
  implements
    IBaseApplication<
      IGetManyPostsApplicationInput,
      Promise<IGetManyPostsApplicationOutput[]>
    >
{
  abstract execute(
    input: IGetManyPostsApplicationInput,
  ): Promise<IGetManyPostsApplicationOutput[]>;
}
