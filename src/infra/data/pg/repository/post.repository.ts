import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '@infra/data/pg/entities/post.entitie';
import { Repository } from 'typeorm';
import {
  FindAndUpdateInput,
  IPostRepository,
} from '@core/providers/infra/i.post.repository';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
  ) {}

  async create(post: PostEntity): Promise<void> {
    await this._postRepository.save(post);
  }

  async findAndUpdate(input: FindAndUpdateInput): Promise<void> {
    const post = await this._postRepository.findOneBy({ id: input.id });

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    Object.assign(post, input.payload);
    await this._postRepository.save(post);
  }
  async findOne(id: number): Promise<PostEntity> {
    return this._postRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this._postRepository.delete({ id });
  }

  async findAll(): Promise<PostEntity[]> {
    return this._postRepository.find({
      select: ['id', 'title', 'body', 'owner'],
    });
  }
}
