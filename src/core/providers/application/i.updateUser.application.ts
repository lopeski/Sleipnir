import { IBaseApplication } from '@core/providers/application/base.application';

export interface IUpdateUserApplicationInput {
  id: number;
  payload: UpdateUserData;
}

export interface UpdateUserData {
  username: string;
  password: string;
  role: string;
}

export type IUpdateUserApplicationOutput = void;

export abstract class IUpdateUserApplication
  implements
    IBaseApplication<
      IUpdateUserApplicationInput,
      Promise<IUpdateUserApplicationOutput>
    >
{
  abstract execute(
    input: IUpdateUserApplicationInput,
  ): Promise<IUpdateUserApplicationOutput>;
}
