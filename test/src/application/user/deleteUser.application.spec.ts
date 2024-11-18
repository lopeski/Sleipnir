import { HttpException } from '@nestjs/common';
import { IDeleteUserUsecase } from '@core/providers/core/i.deleteUser.usecase';
import { DeleteUserApplication } from '@application/user/deleteUser.application';

type SutTypes = {
  sut: DeleteUserApplication;
  deleteUserUsecaseStub: jest.Mocked<IDeleteUserUsecase>;
};

const makeSut = (): SutTypes => {
  const deleteUserUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IDeleteUserUsecase>;

  const sut = new DeleteUserApplication(deleteUserUsecaseStub);

  return {
    sut,
    deleteUserUsecaseStub,
  };
};

describe('DeleteUserApplication', () => {
  it('should call execute on _deleteUserUsecase with correct input and return the result', async () => {
    const { sut, deleteUserUsecaseStub } = makeSut();

    const input = { id: 123 };

    deleteUserUsecaseStub.execute.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(deleteUserUsecaseStub.execute).toHaveBeenCalledWith(input);
    expect(deleteUserUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should throw an HttpException if _deleteUserUsecase throws', async () => {
    const { sut, deleteUserUsecaseStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('User not found');
    (error as any).status = 404;

    deleteUserUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, deleteUserUsecaseStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Unknown error');

    deleteUserUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
