import { IBaseApplication } from '@core/providers/application/base.application';

export type IGetManyUsersApplicationInput = void;

export interface IGetManyUsersApplicationOutput {
  id: number;
  username: string;
  role: string;
}

export abstract class IGetManyUsersApplication
  implements
    IBaseApplication<
      IGetManyUsersApplicationInput,
      Promise<IGetManyUsersApplicationOutput[]>
    >
{
  abstract execute(
    input: IGetManyUsersApplicationInput,
  ): Promise<IGetManyUsersApplicationOutput[]>;
}
