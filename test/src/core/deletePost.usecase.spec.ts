import { DeletePostUsecase } from '@core/use-cases/deletePost.usecase';
import { IPostRepository } from '@core/providers/infra/i.post.repository';

type SutTypes = {
  sut: DeletePostUsecase;
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

  const sut = new DeletePostUsecase(postRepositoryStub);

  return {
    sut,
    postRepositoryStub,
  };
};

describe('DeletePostUsecase', () => {
  it('should call remove on _postRepository with correct input and return the result', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const input = { id: 123 };

    postRepositoryStub.remove.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(postRepositoryStub.remove).toHaveBeenCalledWith(input.id);
    expect(postRepositoryStub.remove).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should propagate errors thrown by _postRepository', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Database error');

    postRepositoryStub.remove.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
