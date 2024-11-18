import { Module } from '@nestjs/common';
import { ApplicationModule } from '@di/application.module';
import { PostController } from '@presentation/https/v1/controller/post.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardModule } from '@presentation/auth/auth.guard.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@presentation/https/v1/controller/auth.controller';
import { UserController } from '@presentation/https/v1/controller/user.controller';

@Module({
  imports: [
    ApplicationModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'D647EF968BA73FF93946ABF267587',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [PostController, AuthController, UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuardModule,
    },
  ],
})
export class PresentationModule {}
