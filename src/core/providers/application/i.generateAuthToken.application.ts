import { IBaseApplication } from '@core/providers/application/base.application';

export interface IGenerateAuthTokenApplicationInput {
  username: string;
  password: string;
}

export interface IGenerateAuthTokenApplicationOutput {
  access_token: string;
}

export abstract class IGenerateAuthTokenApplication
  implements
    IBaseApplication<
      IGenerateAuthTokenApplicationInput,
      Promise<IGenerateAuthTokenApplicationOutput>
    >
{
  abstract execute(
    input: IGenerateAuthTokenApplicationInput,
  ): Promise<IGenerateAuthTokenApplicationOutput>;
}
