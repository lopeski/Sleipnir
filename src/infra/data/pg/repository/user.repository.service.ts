import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@infra/data/pg/entities/user.entitie';
import {
  CreateUserType,
  FindOneAndUpdateInput,
  IUserRepository,
} from '@core/providers/infra/i.user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserType): Promise<void> {
    await this._usersRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this._usersRepository.find({
      select: ['id', 'username', 'role'],
    });
  }

  async findUserByUsername(username: string): Promise<Partial<UserEntity>> {
    return await this._usersRepository.findOne({
      where: { username },
      select: ['role', 'password'],
    });
  }

  async findAndUpdate(input: FindOneAndUpdateInput): Promise<void> {
    const user = await this._usersRepository.findOneBy({ id: input.id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(user, input.payload);
    await this._usersRepository.save(user);
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this._usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this._usersRepository.delete(id);
  }
}
