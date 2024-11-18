import { IBaseApplication } from '@core/providers/application/base.application';

export interface IDeleteUserApplicationInput {
  id: number;
}

export type IDeleteUserApplicationOutput = void;

export abstract class IDeleteUserApplication
  implements
    IBaseApplication<
      IDeleteUserApplicationInput,
      Promise<IDeleteUserApplicationOutput>
    >
{
  abstract execute(
    input: IDeleteUserApplicationInput,
  ): Promise<IDeleteUserApplicationOutput>;
}
