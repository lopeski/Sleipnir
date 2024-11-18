import { UpdatePostUsecase } from '@core/use-cases/updatePost.usecase';
import { IPostRepository } from '@core/providers/infra/i.post.repository';

type SutTypes = {
  sut: UpdatePostUsecase;
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

  const sut = new UpdatePostUsecase(postRepositoryStub);

  return {
    sut,
    postRepositoryStub,
  };
};

describe('UpdatePostUsecase', () => {
  it('should call findAndUpdate on _postRepository with correct input and return the result', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const bodyData = {
      title: 'Updated Title',
      body: 'Updated Content',
    };
    const input = {
      id: 123,
      payload: bodyData,
    };

    postRepositoryStub.findAndUpdate.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(postRepositoryStub.findAndUpdate).toHaveBeenCalledWith(input);
    expect(postRepositoryStub.findAndUpdate).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should propagate errors thrown by _postRepository', async () => {
    const { sut, postRepositoryStub } = makeSut();

    const bodyData = {
      title: 'Updated Title',
      body: 'Updated Content',
    };
    const input = {
      id: 123,
      payload: bodyData,
    };
    const error = new Error('Database error');

    postRepositoryStub.findAndUpdate.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
