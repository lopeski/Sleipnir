import { HttpException } from '@nestjs/common';
import { ICreatePostUsecase } from '@core/providers/core/i.create.post.usecase';
import { CreatePostApplication } from '@application/post/create.post.application';

type SutTypes = {
  sut: CreatePostApplication;
  createPostUsecaseStub: jest.Mocked<ICreatePostUsecase>;
};

const makeSut = (): SutTypes => {
  const createPostUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<ICreatePostUsecase>;

  const sut = new CreatePostApplication(createPostUsecaseStub);

  return {
    sut,
    createPostUsecaseStub,
  };
};

describe('CreatePostApplication', () => {
  it('should call execute on _createPostUsecase with correct input and return result', async () => {
    const { sut, createPostUsecaseStub } = makeSut();

    const input = {
      title: 'Titulo teste',
      body: 'Corpo teste',
      owner: 'Usuario teste',
    };

    createPostUsecaseStub.execute.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(createPostUsecaseStub.execute).toHaveBeenCalledWith(input);
    expect(createPostUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should throw an HttpException if _createPostUsecase throws', async () => {
    const { sut, createPostUsecaseStub } = makeSut();

    const input = {
      title: 'Titulo teste',
      body: 'Corpo teste',
      owner: 'Usuario teste',
    };
    const error = new Error('Database error');
    (error as any).status = 500;

    createPostUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(500);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, createPostUsecaseStub } = makeSut();

    const input = {
      title: 'Titulo teste',
      body: 'Corpo teste',
      owner: 'Usuario teste',
    };
    const error = new Error('Unknown error');

    createPostUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
