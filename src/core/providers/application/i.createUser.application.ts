import { IBaseApplication } from '@core/providers/application/base.application';

export interface ICreateUserApplicationInput {
  username: string;
  password: string;
  role: 'Admin' | 'Editor' | 'Reader';
}

export type ICreateUserApplicationOutput = void;

export abstract class ICreateUserApplication
  implements
    IBaseApplication<
      ICreateUserApplicationInput,
      Promise<ICreateUserApplicationOutput>
    >
{
  abstract execute(
    input: ICreateUserApplicationInput,
  ): Promise<ICreateUserApplicationOutput>;
}
