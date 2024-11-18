import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@infra/data/pg/entities/user.entitie';
import { IUserRepository } from '@core/providers/infra/i.user.repository';
import { UserRepository } from '@infra/data/pg/repository/user.repository.service';
import { PostEntity } from '@infra/data/pg/entities/post.entitie';
import { IPostRepository } from '@core/providers/infra/i.post.repository';
import { PostRepository } from '@infra/data/pg/repository/post.repository';

const infraProvider: Provider[] = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
  {
    provide: IPostRepository,
    useClass: PostRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity])],
  providers: infraProvider,
  exports: infraProvider,
})
export class InfraModule {}
