import { IUserRepository } from '@core/providers/infra/i.user.repository';
import { GetManyUsersUsecase } from '@core/use-cases/get.many.users.usecase';

type SutTypes = {
  sut: GetManyUsersUsecase;
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

  const sut = new GetManyUsersUsecase(userRepositoryStub);

  return {
    sut,
    userRepositoryStub,
  };
};

describe('GetManyUsersUsecase', () => {
  it('should call findAll on _userRepository with correct input and return the result', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const expectedOutput = [
      {
        id: 1,
        username: 'user1',
        role: 'Admin',
        password: '123',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        username: 'user2',
        role: 'Admin',
        password: '123',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    userRepositoryStub.findAll.mockResolvedValueOnce(expectedOutput);

    const result = await sut.execute();

    expect(userRepositoryStub.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedOutput);
  });

  it('should propagate errors thrown by _userRepository', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const error = new Error('Database error');

    userRepositoryStub.findAll.mockRejectedValueOnce(error);

    await expect(sut.execute()).rejects.toThrowError(error);
  });
});
