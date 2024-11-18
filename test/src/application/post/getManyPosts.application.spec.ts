import { HttpException } from '@nestjs/common';
import { IGetManyPostsUsecase } from '@core/providers/core/i.getManyPosts.usecase';
import { GetManyPostsApplication } from '@application/post/getManyPosts.application';

type SutTypes = {
  sut: GetManyPostsApplication;
  getManyPostsUsecaseStub: jest.Mocked<IGetManyPostsUsecase>;
};

const makeSut = (): SutTypes => {
  const getManyPostsUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IGetManyPostsUsecase>;

  const sut = new GetManyPostsApplication(getManyPostsUsecaseStub);

  return {
    sut,
    getManyPostsUsecaseStub,
  };
};

describe('GetManyPostsApplication', () => {
  it('should call execute on _getManyPostsUsecase with correct input and return the result', async () => {
    const { sut, getManyPostsUsecaseStub } = makeSut();

    const expectedOutput = [
      { id: 1, title: 'Post 1', body: 'Content 1', owner: '123' },
      { id: 2, title: 'Post 2', body: 'Content 2', owner: '123' },
    ];

    getManyPostsUsecaseStub.execute.mockResolvedValueOnce(expectedOutput);

    const result = await sut.execute();

    expect(getManyPostsUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(result).toBe(expectedOutput);
  });

  it('should throw an HttpException if _getManyPostsUsecase throws', async () => {
    const { sut, getManyPostsUsecaseStub } = makeSut();

    const error = new Error('Database error');
    (error as any).status = 500;

    getManyPostsUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute()).rejects.toThrow(HttpException);
    try {
      await sut.execute();
    } catch (e) {
      expect(e.status).toBe(500);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, getManyPostsUsecaseStub } = makeSut();

    const error = new Error('Unknown error');

    getManyPostsUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute()).rejects.toThrow(HttpException);
    try {
      await sut.execute();
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
