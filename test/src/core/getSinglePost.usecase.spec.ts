import { GetSinglePostUsecase } from '@core/use-cases/getSinglePost.usecase';
import { IPostRepository } from '@core/providers/infra/i.post.repository';

type SutTypes = {
  sut: GetSinglePostUsecase;
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

  const sut = new GetSinglePostUsecase(postRepositoryStub);

  return {
    sut,
    postRepositoryStub,
  };
};

describe('GetSinglePostUsecase', () => {
  it('should call findOne on _postRepository with correct input and return the result', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const input = { id: 123 };
    const expectedOutput = {
      id: 123,
      title: 'Test Post',
      body: 'Test Content',
      owner: 'teste Owner',
    };

    postRepositoryStub.findOne.mockResolvedValueOnce(expectedOutput);

    const result = await sut.execute(input);

    expect(postRepositoryStub.findOne).toHaveBeenCalledWith(input.id);
    expect(postRepositoryStub.findOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedOutput);
  });

  it('should propagate errors thrown by _postRepository', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Database error');

    postRepositoryStub.findOne.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
