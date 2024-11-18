import { IBaseApplication } from '@core/providers/application/base.application';

export interface IGetSingleUserApplicationInput {
  id: number;
}

export interface IGetSingleUserApplicationOutput {
  id: number;
  username: string;
  role: string;
}

export abstract class IGetSingleUserApplication
  implements
    IBaseApplication<
      IGetSingleUserApplicationInput,
      Promise<IGetSingleUserApplicationOutput>
    >
{
  abstract execute(
    input: IGetSingleUserApplicationInput,
  ): Promise<IGetSingleUserApplicationOutput>;
}
