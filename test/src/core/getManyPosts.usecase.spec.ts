import { IPostRepository } from '@core/providers/infra/i.post.repository';
import { GetManyPostsUsecase } from '@core/use-cases/getManyPosts.usecase';

type SutTypes = {
  sut: GetManyPostsUsecase;
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

  const sut = new GetManyPostsUsecase(postRepositoryStub);

  return {
    sut,
    postRepositoryStub,
  };
};

describe('GetManyPostsUsecase', () => {
  it('should call findAll on _postRepository with correct input and return the result', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const expectedOutput = [
      { id: 1, title: 'Post 1', body: 'tech', owner: 'user2' },
      { id: 2, title: 'Post 2', body: 'tech', owner: 'user' },
    ];

    postRepositoryStub.findAll.mockResolvedValueOnce(expectedOutput);

    const result = await sut.execute();

    expect(postRepositoryStub.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedOutput);
  });

  it('should propagate errors thrown by _postRepository', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const error = new Error('Database error');

    postRepositoryStub.findAll.mockRejectedValueOnce(error);

    await expect(sut.execute()).rejects.toThrowError(error);
  });
});
