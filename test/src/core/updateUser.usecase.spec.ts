import { IUserRepository } from '@core/providers/infra/i.user.repository';
import { UpdateUserUsecase } from '@core/use-cases/updateUser.usecase';

type SutTypes = {
  sut: UpdateUserUsecase;
  userRepositoryStub: jest.Mocked<IUserRepository>;
};

const makeSut = (): SutTypes => {
  const userRepositoryStub = {
    create: jest.fn(),
    findAndUpdate: jest.fn(),
    findUserByUsername: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
  } as jest.Mocked<IUserRepository>;

  const sut = new UpdateUserUsecase(userRepositoryStub);

  return {
    sut,
    userRepositoryStub,
  };
};

describe('UpdateUserUsecase', () => {
  it('should call findAndUpdate on _userRepository with correct input and return the result', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const payload = {
      username: 'test',
      password: 'password123',
      role: 'admin',
    };

    const input = {
      id: 123,
      payload: payload,
    };

    userRepositoryStub.findAndUpdate.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(userRepositoryStub.findAndUpdate).toHaveBeenCalledWith(input);
    expect(userRepositoryStub.findAndUpdate).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should propagate errors thrown by _userRepository', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const payload = {
      username: 'test',
      password: 'password123',
      role: 'admin',
    };

    const input = {
      id: 123,
      payload: payload,
    };
    const error = new Error('Database error');

    userRepositoryStub.findAndUpdate.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
