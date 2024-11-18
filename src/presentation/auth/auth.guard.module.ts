import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ADMIN_ROLE_INSTANCE,
  EDITOR_ROLE_INSTANCE,
  READER_ROLE_INSTANCE,
} from '@presentation/auth/decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '@presentation/auth/decorators/securet.decorators';
import { DecodeType } from '@presentation/auth/type/decode.type';

@Injectable()
export class AuthGuardModule implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _jwtService: JwtService,
  ) {}

  private _extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const rolesToCheck = [
      { roleInstance: ADMIN_ROLE_INSTANCE },
      { roleInstance: EDITOR_ROLE_INSTANCE },
      { roleInstance: READER_ROLE_INSTANCE },
    ];

    const request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);

    if (!token) {
      throw new ForbiddenException('Usuário não autenticado ou sem papéis');
    }
    const activeRoles = rolesToCheck
      .filter(({ roleInstance }) =>
        this._reflector.getAllAndOverride(roleInstance, [
          context.getHandler(),
          context.getClass(),
        ]),
      )
      .map(({ roleInstance }) => roleInstance);

    if (activeRoles.length === 0) {
      return true;
    }
    try {
      const payload: DecodeType = await this._jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'D647EF968BA73FF93946ABF267587',
      });
      request['user'] = payload.username;
      request['role'] = payload.role;
    } catch {
      throw new UnauthorizedException();
    }

    const hasRole = activeRoles.some((value) => request.role === value);

    if (!hasRole) {
      throw new ForbiddenException('Usuário não autenticado ou sem papéis');
    }
    return true;
  }
}
