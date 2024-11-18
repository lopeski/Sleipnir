import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Admin } from '@presentation/auth/decorators/roles.decorator';
import { ICreateUserApplication } from '@core/providers/application/i.createUser.application';
import { UserCreateSchemaInput } from '@presentation/https/v1/dto/user/user.create.schema';
import { IUpdateUserApplication } from '@core/providers/application/i.updateUser.application';
import { UserUpdateSchemaInput } from '@presentation/https/v1/dto/user/user.update.schema';
import { IGetManyUsersApplication } from '@core/providers/application/i.getManyUsers.application';
import { UserGetAllSchemaOutput } from '@presentation/https/v1/dto/user/user.getAll.schema';
import { IGetSingleUserApplication } from '@core/providers/application/i.getSingleUser.application';
import { UserGetSingleSchemaOutput } from '@presentation/https/v1/dto/user/user.getSingle.schema';
import { IDeleteUserApplication } from '@core/providers/application/i.deleteUser.application';

@Controller('user')
export class UserController {
  constructor(
    private readonly _getManyUsersApplication: IGetManyUsersApplication,
    private readonly _getSingleUserApplication: IGetSingleUserApplication,
    private readonly _createUserApplication: ICreateUserApplication,
    private readonly _updateUserApplication: IUpdateUserApplication,
    private readonly _deleteUserApplication: IDeleteUserApplication,
  ) {}

  @Admin()
  @Get()
  async findAll(): Promise<UserGetAllSchemaOutput[]> {
    return await this._getManyUsersApplication.execute();
  }

  @Admin()
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserGetSingleSchemaOutput> {
    return await this._getSingleUserApplication.execute({ id });
  }

  @Admin()
  @Post()
  async create(@Body() createPostDto: UserCreateSchemaInput): Promise<void> {
    return await this._createUserApplication.execute(createPostDto);
  }

  @Admin()
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UserUpdateSchemaInput,
  ): Promise<void> {
    return await this._updateUserApplication.execute({
      id: id,
      payload: updatePostDto,
    });
  }

  @Admin()
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this._deleteUserApplication.execute({ id });
  }
}
