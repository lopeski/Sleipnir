import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export interface BasicAuthDecoratorOutput {
  username: string;
  password: string;
}

export const basicAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): BasicAuthDecoratorOutput => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Credenciais inválidas ou não encontradas.',
      );
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');

    if (!username || !password) {
      throw new UnauthorizedException('Credenciais Invalidas');
    }

    return { username, password };
  },
);
