import { HttpException } from '@nestjs/common';
import { IGetSinglePostUsecase } from '@core/providers/core/i.getSinglePost.usecase';
import { GetSinglePostApplication } from '@application/post/getSinglePost.application';

type SutTypes = {
  sut: GetSinglePostApplication;
  getSinglePostUsecaseStub: jest.Mocked<IGetSinglePostUsecase>;
};

const makeSut = (): SutTypes => {
  const getSinglePostUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IGetSinglePostUsecase>;

  const sut = new GetSinglePostApplication(getSinglePostUsecaseStub);

  return {
    sut,
    getSinglePostUsecaseStub,
  };
};

describe('GetSinglePostApplication', () => {
  it('should call execute on _getSinglePostUsecase with correct input and return the result', async () => {
    const { sut, getSinglePostUsecaseStub } = makeSut();

    const input = { id: 123 };
    const expectedOutput = {
      id: 123,
      title: 'Post Title',
      body: 'Post Content',
      owner: 'User',
    };

    getSinglePostUsecaseStub.execute.mockResolvedValueOnce(expectedOutput);

    const result = await sut.execute(input);

    expect(getSinglePostUsecaseStub.execute).toHaveBeenCalledWith(input);
    expect(getSinglePostUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedOutput);
  });

  it('should throw an HttpException if _getSinglePostUsecase throws', async () => {
    const { sut, getSinglePostUsecaseStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Post not found');
    (error as any).status = 404;

    getSinglePostUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, getSinglePostUsecaseStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Unknown error');

    getSinglePostUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
