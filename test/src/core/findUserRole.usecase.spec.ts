import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { FindUserRoleUsecase } from '@core/use-cases/findUserRole.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';

jest.mock('bcryptjs');

type SutTypes = {
  sut: FindUserRoleUsecase;
  userRepositoryStub: jest.Mocked<IUserRepository>;
};

const makeSut = (): SutTypes => {
  const userRepositoryStub = {
    create: jest.fn(),
    findAndUpdate: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findUserByUsername: jest.fn(),
  } as jest.Mocked<IUserRepository>;

  const sut = new FindUserRoleUsecase(userRepositoryStub);

  return {
    sut,
    userRepositoryStub,
  };
};

describe('FindUserRoleUsecase', () => {
  it('should return the user role if credentials are valid', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const input = { username: 'testuser', password: 'validpassword' };
    const user = {
      username: 'testuser',
      password: 'hashedPassword',
      role: 'admin',
    };

    userRepositoryStub.findUserByUsername.mockResolvedValueOnce(user);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    const result = await sut.execute(input);

    expect(userRepositoryStub.findUserByUsername).toHaveBeenCalledWith(
      input.username,
    );
    expect(userRepositoryStub.findUserByUsername).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(input.password, user.password);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(result).toBe(user.role);
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const input = { username: 'nonexistentuser', password: 'anypassword' };

    userRepositoryStub.findUserByUsername.mockResolvedValueOnce(null);

    await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    await expect(sut.execute(input)).rejects.toThrowError(
      'Usuario não AUTORIZADO',
    );
  });

  it('should throw UnauthorizedException if password comparison fails', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const input = { username: 'testuser', password: 'wrongpassword' };
    const user = {
      username: 'testuser',
      password: 'hashedPassword',
      role: 'admin',
    };

    userRepositoryStub.findUserByUsername.mockResolvedValueOnce(user);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    await expect(sut.execute(input)).rejects.toThrowError(
      'Usuario não AUTORIZADO',
    );
  });

  it('should throw UnauthorizedException if bcrypt.compare throws an error', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const input = { username: 'testuser', password: 'anypassword' };
    const user = {
      username: 'testuser',
      password: 'hashedPassword',
      role: 'admin',
    };

    userRepositoryStub.findUserByUsername.mockResolvedValueOnce(user);
    (bcrypt.compare as jest.Mock).mockRejectedValueOnce(
      new Error('bcrypt error'),
    );

    await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    await expect(sut.execute(input)).rejects.toThrowError(
      'Usuario não AUTORIZADO',
    );
  });
});
