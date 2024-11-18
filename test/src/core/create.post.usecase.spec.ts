import { IPostRepository } from '@core/providers/infra/i.post.repository';
import { CreatePostUsecase } from '@core/use-cases/create.post.usecase';

type SutTypes = {
  sut: CreatePostUsecase;
  postRepositoryStub: jest.Mocked<IPostRepository>;
};

const makeSut = (): SutTypes => {
  const postRepositoryStub = {
    create: jest.fn(),
    findAndUpdate: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
  } as jest.Mocked<IPostRepository>;

  const sut = new CreatePostUsecase(postRepositoryStub);

  return {
    sut,
    postRepositoryStub,
  };
};

describe('CreatePostUsecase', () => {
  it('should call create on _postRepository with correct input', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const input = {
      title: 'Test Post',
      body: 'This is a test post.',
      owner: '123',
    };

    postRepositoryStub.create.mockResolvedValueOnce();

    await sut.execute(input);

    expect(postRepositoryStub.create).toHaveBeenCalledWith(input);
    expect(postRepositoryStub.create).toHaveBeenCalledTimes(1);
  });

  it('should propagate errors thrown by _postRepository', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const input = {
      title: 'Test Post',
      body: 'This is a test post.',
      owner: '123',
    };
    const error = new Error('Database error');

    postRepositoryStub.create.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
