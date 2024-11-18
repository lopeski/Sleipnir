import { HttpException } from '@nestjs/common';
import { IUpdateUserUsecase } from '@core/providers/core/i.updateUser.usecase';
import { UpdateUserApplication } from '@application/user/updateUser.application';

type SutTypes = {
  sut: UpdateUserApplication;
  updateUserUsecaseStub: jest.Mocked<IUpdateUserUsecase>;
};

const makeSut = (): SutTypes => {
  const updateUserUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IUpdateUserUsecase>;

  const sut = new UpdateUserApplication(updateUserUsecaseStub);

  return {
    sut,
    updateUserUsecaseStub,
  };
};

describe('UpdateUserApplication', () => {
  it('should call execute on _updateUserUsecase with correct input and return the result', async () => {
    const { sut, updateUserUsecaseStub } = makeSut();

    const payload = {
      username: 'test',
      password: 'password123',
      role: 'admin',
    };

    const input = {
      id: 123,
      payload: payload,
    };

    updateUserUsecaseStub.execute.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(updateUserUsecaseStub.execute).toHaveBeenCalledWith(input);
    expect(updateUserUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should throw an HttpException if _updateUserUsecase throws', async () => {
    const { sut, updateUserUsecaseStub } = makeSut();

    const payload = {
      username: 'test',
      password: 'password123',
      role: 'admin',
    };

    const input = {
      id: 123,
      payload: payload,
    };
    const error = new Error('User not found');
    (error as any).status = 404;

    updateUserUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, updateUserUsecaseStub } = makeSut();

    const payload = {
      username: 'test',
      password: 'password123',
      role: 'admin',
    };

    const input = {
      id: 123,
      payload: payload,
    };
    const error = new Error('Unknown error');

    updateUserUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
