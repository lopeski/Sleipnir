import { CreateUserUsecase } from '@core/use-cases/createUser.usecase';
import { IUserRepository } from '@core/providers/infra/i.user.repository';
import { ICreateUserUsecaseUsecaseInput } from "@core/providers/core/i.createUser.usecase";

type SutTypes = {
  sut: CreateUserUsecase;
  userRepositoryStub: jest.Mocked<IUserRepository>;
};

const makeSut = (): SutTypes => {
  const userRepositoryStub = {
    create: jest.fn(),
    findUserByUsername: jest.fn(),
    findAndUpdate: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
  } as jest.Mocked<IUserRepository>;

  const sut = new CreateUserUsecase(userRepositoryStub);

  return {
    sut,
    userRepositoryStub,
  };
};

describe('CreateUserUsecase', () => {
  it('should call create on _userRepository with correct input and return the result', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const input = {
      username: 'testuser',
      password: 'hashedPassword',
      role: 'Admin',
    } as ICreateUserUsecaseUsecaseInput;

    userRepositoryStub.create.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(userRepositoryStub.create).toHaveBeenCalledWith(input);
    expect(userRepositoryStub.create).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should propagate errors thrown by _userRepository', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const input = {
      username: 'testuser',
      password: 'hashedPassword',
      role: 'Admin',
    } as ICreateUserUsecaseUsecaseInput;

    const error = new Error('Database error');

    userRepositoryStub.create.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
