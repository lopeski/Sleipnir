import { DeleteUserUsecase } from "@core/use-cases/deleteUser.usecase";
import { IUserRepository } from "@core/providers/infra/i.user.repository";

type SutTypes = {
  sut: DeleteUserUsecase;
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

  const sut = new DeleteUserUsecase(userRepositoryStub);

  return {
    sut,
    userRepositoryStub,
  };
};

describe('DeleteUserUsecase', () => {
  it('should call remove on _userRepository with correct input and return the result', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const input = { id: 123 };

    userRepositoryStub.remove.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(userRepositoryStub.remove).toHaveBeenCalledWith(input.id);
    expect(userRepositoryStub.remove).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should propagate errors thrown by _userRepository', async () => {
    const { sut, userRepositoryStub } = makeSut();

    const input = { id: 123 };
    const error = new Error('Database error');

    userRepositoryStub.remove.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
