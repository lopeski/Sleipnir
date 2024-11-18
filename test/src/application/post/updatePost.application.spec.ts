import { HttpException } from '@nestjs/common';
import { IUpdatePostUsecase } from '@core/providers/core/i.updatePost.usecase';
import { UpdatePostApplication } from '@application/post/updatePost.application';

type SutTypes = {
  sut: UpdatePostApplication;
  updatePostUsecaseStub: jest.Mocked<IUpdatePostUsecase>;
};

const makeSut = (): SutTypes => {
  const updatePostUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IUpdatePostUsecase>;

  const sut = new UpdatePostApplication(updatePostUsecaseStub);

  return {
    sut,
    updatePostUsecaseStub,
  };
};

describe('UpdatePostApplication', () => {
  it('should call execute on _updatePostUsecase with correct input and return the result', async () => {
    const { sut, updatePostUsecaseStub } = makeSut();

    const bodyData = {
      title: 'Updated Title',
      body: 'Updated Content',
    };
    const input = {
      id: 123,
      payload: bodyData,
    };

    updatePostUsecaseStub.execute.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(updatePostUsecaseStub.execute).toHaveBeenCalledWith(input);
    expect(updatePostUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should throw an HttpException if _updatePostUsecase throws', async () => {
    const { sut, updatePostUsecaseStub } = makeSut();

    const bodyData = {
      title: 'Updated Title',
      body: 'Updated Content',
    };
    const input = {
      id: 123,
      payload: bodyData,
    };

    const error = new Error('Post not found');
    (error as any).status = 404;

    updatePostUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, updatePostUsecaseStub } = makeSut();

    const bodyData = {
      title: 'Updated Title',
      body: 'Updated Content',
    };
    const input = {
      id: 123,
      payload: bodyData,
    };

    const error = new Error('Unknown error');

    updatePostUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
