import { HttpException } from '@nestjs/common';
import { IFindUserRoleUsecase } from '@core/providers/core/i.findUserRole.usecase';
import { IGenerateJwtTokenUsecase } from '@core/providers/core/I.generate.jwt.token.usecase';
import { GenerateAuthTokenApplication } from '@application/auth/generateAuthToken.application';

type SutTypes = {
  sut: GenerateAuthTokenApplication;
  findUserRoleUsecaseStub: jest.Mocked<IFindUserRoleUsecase>;
  generateJwtTokenUsecaseStub: jest.Mocked<IGenerateJwtTokenUsecase>;
};

const makeSut = (): SutTypes => {
  const findUserRoleUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IFindUserRoleUsecase>;

  const generateJwtTokenUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<IGenerateJwtTokenUsecase>;

  const sut = new GenerateAuthTokenApplication(
    findUserRoleUsecaseStub,
    generateJwtTokenUsecaseStub,
  );

  return {
    sut,
    findUserRoleUsecaseStub,
    generateJwtTokenUsecaseStub,
  };
};

describe('GenerateAuthTokenApplication', () => {
  it('should return a valid token when all dependencies execute successfully', async () => {
    const { sut, findUserRoleUsecaseStub, generateJwtTokenUsecaseStub } =
      makeSut();

    const input = { username: 'test-user', password: 'test-pass' };
    const userRole = 'admin';
    const token = 'valid-jwt-token';

    findUserRoleUsecaseStub.execute.mockResolvedValueOnce(userRole);
    generateJwtTokenUsecaseStub.execute.mockResolvedValueOnce({
      access_token: token,
    });

    const response = await sut.execute(input);

    expect(findUserRoleUsecaseStub.execute).toHaveBeenCalledWith(input);
    expect(generateJwtTokenUsecaseStub.execute).toHaveBeenCalledWith({
      username: input.username,
      role: userRole,
    });
    expect(response).toEqual({ access_token: token });
  });

  it('should throw an HttpException with status 412 if findUserRoleUsecase throws', async () => {
    const { sut, findUserRoleUsecaseStub } = makeSut();

    const input = { username: 'test-user', password: 'test-pass' };
    const error = new Error('User not found');
    (error as any).status = 404;

    findUserRoleUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  it('should throw an HttpException with status 412 if generateJwtTokenUsecase throws', async () => {
    const { sut, findUserRoleUsecaseStub, generateJwtTokenUsecaseStub } =
      makeSut();

    const input = { username: 'test-user', password: 'test-pass' };
    const userRole = 'admin';
    const error = new Error('JWT generation failed');
    (error as any).status = 500;

    findUserRoleUsecaseStub.execute.mockResolvedValueOnce(userRole);
    generateJwtTokenUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(Error);

    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(500);
    }
  });
});
