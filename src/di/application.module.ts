import { Module, Provider } from '@nestjs/common';
import { CoreModule } from '@di/core.module';
import { IGenerateAuthTokenApplication } from '@core/providers/application/i.generateAuthToken.application';
import { GenerateAuthTokenApplication } from '@application/auth/generateAuthToken.application';
import { ICreatePostApplication } from '@core/providers/application/i.create.post.application';
import { CreatePostApplication } from '@application/post/create.post.application';
import { IGetManyPostsApplication } from '@core/providers/application/i.getManyPosts.application';
import { GetManyPostsApplication } from '@application/post/getManyPosts.application';
import { IGetSinglePostApplication } from '@core/providers/application/i.getSinglePost.application';
import { GetSinglePostApplication } from '@application/post/getSinglePost.application';
import { IUpdatePostApplication } from '@core/providers/application/i.updatePost.application';
import { UpdatePostApplication } from '@application/post/updatePost.application';
import { IDeletePostApplication } from '@core/providers/application/i.deletePost.application';
import { DeletePostApplication } from '@application/post/deletePost.application';
import { ICreateUserApplication } from '@core/providers/application/i.createUser.application';
import { CreateUserApplication } from '@application/user/createUser.application';
import { IGetManyUsersApplication } from '@core/providers/application/i.getManyUsers.application';
import { GetManyUsersApplication } from '@application/user/getManyUsers.application';
import { IGetSingleUserApplication } from '@core/providers/application/i.getSingleUser.application';
import { GetSingleUserApplication } from '@application/user/getSingleUser.application';
import { IUpdateUserApplication } from '@core/providers/application/i.updateUser.application';
import { UpdateUserApplication } from '@application/user/updateUser.application';
import { IDeleteUserApplication } from '@core/providers/application/i.deleteUser.application';
import { DeleteUserApplication } from '@application/user/deleteUser.application';

const applicationProviders: Provider[] = [
  {
    provide: IGenerateAuthTokenApplication,
    useClass: GenerateAuthTokenApplication,
  },
  { provide: ICreatePostApplication, useClass: CreatePostApplication },
  { provide: IGetManyPostsApplication, useClass: GetManyPostsApplication },
  { provide: IGetSinglePostApplication, useClass: GetSinglePostApplication },
  { provide: IUpdatePostApplication, useClass: UpdatePostApplication },
  { provide: IDeletePostApplication, useClass: DeletePostApplication },
  { provide: ICreateUserApplication, useClass: CreateUserApplication },
  { provide: IGetManyUsersApplication, useClass: GetManyUsersApplication },
  { provide: IGetSingleUserApplication, useClass: GetSingleUserApplication },
  { provide: IUpdateUserApplication, useClass: UpdateUserApplication },
  { provide: IDeleteUserApplication, useClass: DeleteUserApplication },
];

@Module({
  imports: [CoreModule],
  providers: applicationProviders,
  exports: applicationProviders,
})
export class ApplicationModule {}
