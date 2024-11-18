import { HttpException } from '@nestjs/common';
import { ICreateUserUsecase } from '@core/providers/core/i.createUser.usecase';
import { ICreateHashPasswordUsecase } from '@core/providers/core/i.createHashPassword.usecase';
import { CreateUserApplication } from '@application/user/createUser.application';
import { ICreateUserApplicationInput } from '@core/providers/application/i.createUser.application';

type SutTypes = {
  sut: CreateUserApplication;
  createUserUsecaseStub: jest.Mocked<ICreateUserUsecase>;
  createHashPasswordUsecaseStub: jest.Mocked<ICreateHashPasswordUsecase>;
};

const makeSut = (): SutTypes => {
  const createUserUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<ICreateUserUsecase>;

  const createHashPasswordUsecaseStub = {
    execute: jest.fn(),
  } as jest.Mocked<ICreateHashPasswordUsecase>;

  const sut = new CreateUserApplication(
    createUserUsecaseStub,
    createHashPasswordUsecaseStub,
  );

  return {
    sut,
    createUserUsecaseStub,
    createHashPasswordUsecaseStub,
  };
};

describe('CreateUserApplication', () => {
  it('should call execute on _createHashPasswordUsecase and _createUserUsecase with correct input and return the result', async () => {
    const { sut, createUserUsecaseStub, createHashPasswordUsecaseStub } =
      makeSut();

    const input: ICreateUserApplicationInput = {
      username: 'testuser',
      password: 'plainpassword',
      role: 'Admin',
    };
    const hashedPassword = 'hashedpassword123';

    createHashPasswordUsecaseStub.execute.mockResolvedValueOnce(hashedPassword);
    createUserUsecaseStub.execute.mockResolvedValueOnce();

    const result = await sut.execute(input);

    expect(createHashPasswordUsecaseStub.execute).toHaveBeenCalledWith(
      input.password,
    );
    expect(createHashPasswordUsecaseStub.execute).toHaveBeenCalledTimes(1);

    expect(createUserUsecaseStub.execute).toHaveBeenCalledWith({
      username: input.username,
      role: 'Admin',
      password: hashedPassword,
    });
    expect(createUserUsecaseStub.execute).toHaveBeenCalledTimes(1);

    expect(result).toBeUndefined();
  });

  it('should throw an HttpException if _createHashPasswordUsecase throws', async () => {
    const { sut, createHashPasswordUsecaseStub } = makeSut();

    const input: ICreateUserApplicationInput = {
      username: 'testuser',
      password: 'plainpassword',
      role: 'Admin',
    };
    const error = new Error('Hash generation failed');
    (error as any).status = 500;

    createHashPasswordUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(500);
    }
  });

  it('should throw an HttpException if _createUserUsecase throws', async () => {
    const { sut, createUserUsecaseStub, createHashPasswordUsecaseStub } =
      makeSut();

    const input: ICreateUserApplicationInput = {
      username: 'testuser',
      password: 'plainpassword',
      role: 'Admin',
    };
    const hashedPassword = 'hashedpassword123';
    const error = new Error('User creation failed');
    (error as any).status = 400;

    createHashPasswordUsecaseStub.execute.mockResolvedValueOnce(hashedPassword);
    createUserUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  it('should throw an HttpException with default status 412 if error has no status', async () => {
    const { sut, createHashPasswordUsecaseStub } = makeSut();

    const input: ICreateUserApplicationInput = {
      username: 'testuser',
      password: 'plainpassword',
      role: 'Admin',
    };
    const error = new Error('Unknown error');

    createHashPasswordUsecaseStub.execute.mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrow(HttpException);
    try {
      await sut.execute(input);
    } catch (e) {
      expect(e.status).toBe(412);
    }
  });
});
