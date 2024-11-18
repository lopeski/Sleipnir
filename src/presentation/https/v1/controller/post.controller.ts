import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  Admin,
  Editor,
  Reader,
} from '@presentation/auth/decorators/roles.decorator';
import { ICreatePostApplication } from '@core/providers/application/i.create.post.application';
import { PostCreateSchemaInput } from '@presentation/https/v1/dto/post/post.create.schema';
import { UserData } from '@presentation/auth/decorators/user.data.decorator';
import { UserDataDecoratorType } from '@presentation/auth/type/user.data.decorator.type';
import { IDeletePostApplication } from '@core/providers/application/i.deletePost.application';
import { IGetManyPostsApplication } from '@core/providers/application/i.getManyPosts.application';
import { PostFindManySchemaOutput } from '@presentation/https/v1/dto/post/post.find.many.schema';
import { IGetSinglePostApplication } from '@core/providers/application/i.getSinglePost.application';
import { PostFindSingleSchemaOutput } from '@presentation/https/v1/dto/post/post.find.single.schema';
import { IUpdatePostApplication } from '@core/providers/application/i.updatePost.application';
import { PostUpdateSchemaInput } from '@presentation/https/v1/dto/post/post.update.schema';

@Controller('posts')
export class PostController {
  constructor(
    private readonly _createPostApplication: ICreatePostApplication,
    private readonly _getManyPostsApplication: IGetManyPostsApplication,
    private readonly _getSinglePostApplication: IGetSinglePostApplication,
    private readonly _updatePostApplication: IUpdatePostApplication,
    private readonly _deletePostApplication: IDeletePostApplication,
  ) {}

  @Admin()
  @Editor()
  @Get()
  async findAll(): Promise<PostFindManySchemaOutput[]> {
    return await this._getManyPostsApplication.execute();
  }

  @Admin()
  @Editor()
  @Reader()
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostFindSingleSchemaOutput> {
    return await this._getSinglePostApplication.execute({ id });
  }

  @Admin()
  @Editor()
  @Post()
  async create(
    @Body() createPostDto: PostCreateSchemaInput,
    @UserData() userData: UserDataDecoratorType,
  ): Promise<void> {
    return await this._createPostApplication.execute({
      owner: userData.userName,
      ...createPostDto,
    });
  }

  @Admin()
  @Editor()
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: PostUpdateSchemaInput,
  ): Promise<void> {
    return await this._updatePostApplication.execute({
      id: id,
      payload: updatePostDto,
    });
  }

  @Admin()
  @Editor()
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this._deletePostApplication.execute({ id });
  }
}
