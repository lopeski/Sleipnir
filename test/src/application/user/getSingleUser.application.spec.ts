import { HttpException } from '@nestjs/common';
import { IGetSingleUserUsecase } from '@core/providers/core/i.getSingleUser.usecase';
import { GetSingleUserAdapter } from '@application/user/adapter/get.single.user.adapter';
import { GetSingleUserApplication } from '@application/user/getSingleUser.application';

jest.mock('@application/user/adapter/get.single.user.adapter');

type SutTypes = {
  sut: GetSingleUserApplication;
  getSingleUserUsecaseStub: jest.Mocked<IGetSingleUserUsecase>;
};

const makeSut = (): SutTypes => {
  const getSingleUserUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IGetSingleUserUsecase>;

  const sut = new GetSingleUserApplication(getSingleUserUsecaseStub);

  return {
    sut,
    getSingleUserUsecaseStub,
  };
};

describe('GetSingleUserApplication', () => {
  it('should call execute on _getSingleUser with correct input, adapt the result, and return it', async () => {
    const { sut, getSingleUserUsecaseStub } = makeSut();

    const input = { id: 123 };
    const userDomain = {
      id: 123,
      username: 'John Doe',
      role: 'Admin',
    };
    const userAdapted = {
      id: 123,
      username: 'John Doe',
      role: 'Admin',
    };

    getSingleUserUsecaseStub.execute.mockResolvedValueOnce(userDomain);
    (GetSingleUserAdapter.domainToRequest as jest.Mock).mockReturnValueOnce(
      userAdapted,
    );

    const result = await sut.execute(input);

    expect(getSingleUserUsecaseStub.execute).toHaveBeenCalledWith(input);
    expect(getSingleUserUsecaseStub.execute).toHaveBeenCalledTimes(1);
    expect(GetSingleUserAdapter.domainToRequest).toHaveBeenCalledWith(
      userDomain,
    );
    expect(GetSingleUserAdapter.domainToRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userAdapted);
  });

  it('should throw an HttpException if _getSingleUser throws', async () => {
    const { sut, getSingleUserUsecaseStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('User not found');
    (error as any).status = 404;

    getSingleUserUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, getSingleUserUsecaseStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Unknown error');

    getSingleUserUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
