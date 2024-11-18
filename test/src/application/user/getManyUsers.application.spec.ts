import { HttpException } from '@nestjs/common';
import { IGetManyUsersUsecase } from '@core/providers/core/i..get.many.users.usecase';
import { GetManyUsersApplication } from '@application/user/getManyUsers.application';

type SutTypes = {
  sut: GetManyUsersApplication;
  getManyUsersUsecaseStub: jest.Mocked<IGetManyUsersUsecase>;
};

const makeSut = (): SutTypes => {
  const getManyUsersUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IGetManyUsersUsecase>;

  const sut = new GetManyUsersApplication(getManyUsersUsecaseStub);

  return {
    sut,
    getManyUsersUsecaseStub,
  };
};

describe('GetManyUsersApplication', () => {
  it('should call execute on _getManyUsersUsecase with correct input and return the result', async () => {
    const { sut, getManyUsersUsecaseStub } = makeSut();

    const expectedOutput = [
      { id: 1, username: 'User One', role: 'Admin' },
      { id: 2, username: 'User Two', role: 'Editor' },
    ];

    getManyUsersUsecaseStub.execute.mockResolvedValueOnce(expectedOutput);

    const result = await sut.execute();

    expect(getManyUsersUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedOutput);
  });

  it('should throw an HttpException if _getManyUsersUsecase throws', async () => {
    const { sut, getManyUsersUsecaseStub } = makeSut();

    const error = new Error('Database error');
    (error as any).status = 500;

    getManyUsersUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute()).rejects.toThrow(HttpException);
    try {
      await sut.execute();
    } catch (e) {
      expect(e.status).toBe(500);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, getManyUsersUsecaseStub } = makeSut();

    const error = new Error('Unknown error');

    getManyUsersUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute()).rejects.toThrow(HttpException);
    try {
      await sut.execute();
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
