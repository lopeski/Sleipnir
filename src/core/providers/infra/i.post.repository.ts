import { PostEntity } from '@infra/data/pg/entities/post.entitie';

export interface FindAndUpdateInput {
  id: number;
  payload: Partial<PostEntity>;
}

export interface PostDataType {
  id: number;
  title: string;
  body: string;
  owner: string;
}

export abstract class IPostRepository {
  abstract create(post: Partial<PostEntity>): Promise<void>;
  abstract findAndUpdate(input: FindAndUpdateInput): Promise<void>;
  abstract findOne(id: number): Promise<PostEntity>;
  abstract remove(id: number): Promise<void>;
  abstract findAll(input: void): Promise<Partial<PostDataType[]>>;
}
