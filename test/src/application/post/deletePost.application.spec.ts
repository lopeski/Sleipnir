import { HttpException } from '@nestjs/common';
import { IDeletePostUsecase } from '@core/providers/core/i.deletePost.usecase';
import { DeletePostApplication } from '@application/post/deletePost.application';

type SutTypes = {
  sut: DeletePostApplication;
  deletePostUsecaseStub: jest.Mocked<IDeletePostUsecase>;
};

const makeSut = (): SutTypes => {
  const deletePostUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IDeletePostUsecase>;

  const sut = new DeletePostApplication(deletePostUsecaseStub);

  return {
    sut,
    deletePostUsecaseStub,
  };
};

describe('DeletePostApplication', () => {
  it('should call execute on _deletePostUsecase with correct input and return result', async () => {
    const { sut, deletePostUsecaseStub } = makeSut();

    const input = { id: 123 };
    const expectedOutput = { success: true };

    deletePostUsecaseStub.execute.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(deletePostUsecaseStub.execute).toHaveBeenCalledWith(input);
    expect(deletePostUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should throw an HttpException if _deletePostUsecase throws', async () => {
    const { sut, deletePostUsecaseStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Post not found');
    (error as any).status = 404;

    deletePostUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, deletePostUsecaseStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Unknown error');

    deletePostUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
