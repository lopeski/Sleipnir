import { Module, Provider } from '@nestjs/common';
import { InfraModule } from '@di/infra.module';
import { IFindUserRoleUsecase } from '@core/providers/core/i.findUserRole.usecase';
import { FindUserRoleUsecase } from '@core/use-cases/findUserRole.usecase';
import { IGenerateJwtTokenUsecase } from '@core/providers/core/I.generate.jwt.token.usecase';
import { GenerateJwtTokenUsecase } from '@core/use-cases/generate-jwt-token-usecase.service';
import { JwtModule } from '@nestjs/jwt';
import { ICreatePostUsecase } from '@core/providers/core/i.create.post.usecase';
import { CreatePostUsecase } from '@core/use-cases/create.post.usecase';
import { ICreateUserUsecase } from '@core/providers/core/i.createUser.usecase';
import { CreateUserUsecase } from '@core/use-cases/createUser.usecase';
import { ICreateHashPasswordUsecase } from '@core/providers/core/i.createHashPassword.usecase';
import { CreateHashPasswordUsecase } from '@core/use-cases/createHashPassword.usecase';
import { IUpdateUserUsecase } from '@core/providers/core/i.updateUser.usecase';
import { UpdateUserUsecase } from '@core/use-cases/updateUser.usecase';
import { IGetManyUsersUsecase } from '@core/providers/core/i..get.many.users.usecase';
import { GetManyUsersUsecase } from '@core/use-cases/get.many.users.usecase';
import { IGetSingleUserUsecase } from '@core/providers/core/i.getSingleUser.usecase';
import { GetSingleUserUsecase } from '@core/use-cases/getSingleUser.usecase';
import { IDeletePostUsecase } from '@core/providers/core/i.deletePost.usecase';
import { DeletePostUsecase } from '@core/use-cases/deletePost.usecase';
import { IGetManyPostsUsecase } from '@core/providers/core/i.getManyPosts.usecase';
import { GetManyPostsUsecase } from '@core/use-cases/getManyPosts.usecase';
import { IGetSinglePostUsecase } from '@core/providers/core/i.getSinglePost.usecase';
import { GetSinglePostUsecase } from '@core/use-cases/getSinglePost.usecase';
import { IUpdatePostUsecase } from '@core/providers/core/i.updatePost.usecase';
import { UpdatePostUsecase } from '@core/use-cases/updatePost.usecase';
import { IDeleteUserUsecase } from '@core/providers/core/i.deleteUser.usecase';
import { DeleteUserUsecase } from '@core/use-cases/deleteUser.usecase';

const coreProviders: Provider[] = [
  { provide: IFindUserRoleUsecase, useClass: FindUserRoleUsecase },
  { provide: IGenerateJwtTokenUsecase, useClass: GenerateJwtTokenUsecase },
  { provide: ICreatePostUsecase, useClass: CreatePostUsecase },
  { provide: ICreateUserUsecase, useClass: CreateUserUsecase },
  { provide: ICreateHashPasswordUsecase, useClass: CreateHashPasswordUsecase },
  { provide: IUpdateUserUsecase, useClass: UpdateUserUsecase },
  { provide: IGetManyUsersUsecase, useClass: GetManyUsersUsecase },
  { provide: IGetSingleUserUsecase, useClass: GetSingleUserUsecase },
  { provide: IDeletePostUsecase, useClass: DeletePostUsecase },
  { provide: IGetManyPostsUsecase, useClass: GetManyPostsUsecase },
  { provide: IGetSinglePostUsecase, useClass: GetSinglePostUsecase },
  { provide: IUpdatePostUsecase, useClass: UpdatePostUsecase },
  { provide: IDeleteUserUsecase, useClass: DeleteUserUsecase },
];

@Module({
  imports: [
    InfraModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: coreProviders,
  exports: coreProviders,
})
export class CoreModule {}
