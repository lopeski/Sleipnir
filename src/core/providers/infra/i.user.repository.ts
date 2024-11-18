import { UserEntity } from '@infra/data/pg/entities/user.entitie';

export interface CreateUserType {
  username: string;
  password: string;
  role: 'Admin' | 'Editor' | 'Reader';
}

export interface FindOneAndUpdateInput {
  id: number;
  payload: Partial<UserEntity>;
}

export abstract class IUserRepository {
  abstract create(user: CreateUserType): Promise<void>;
  abstract findUserByUsername(username: string): Promise<Partial<UserEntity>>;
  abstract findAndUpdate(input: FindOneAndUpdateInput): Promise<void>;
  abstract findAll(input: void): Promise<UserEntity[]>;
  abstract findOne(id: number): Promise<UserEntity | null>;
  abstract remove(id: number): Promise<void>;
}
