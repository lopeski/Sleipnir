import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDataDecoratorType } from '@presentation/auth/type/user.data.decorator.type';

export const UserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDataDecoratorType => {
    const request = ctx.switchToHttp().getRequest();

    return {
      userName: request['user'],
      roles: request['role'],
    } as UserDataDecoratorType;
  },
);
