import * as bcrypt from 'bcryptjs';
import { CreateHashPasswordUsecase } from '@core/use-cases/createHashPassword.usecase';

jest.mock('bcryptjs');

describe('CreateHashPasswordUsecase', () => {
  let sut: CreateHashPasswordUsecase;

  beforeEach(() => {
    sut = new CreateHashPasswordUsecase();
  });

  it('should generate a hash with bcrypt.genSalt and bcrypt.hash', async () => {
    const input = 'plainPassword';
    const salt = 'randomSalt';
    const hash = 'hashedPassword';

    (bcrypt.genSalt as jest.Mock).mockResolvedValueOnce(salt);
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hash);

    const result = await sut.execute(input);

    expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(input, salt);
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(result).toBe(hash);
  });

  it('should propagate errors thrown by bcrypt.genSalt', async () => {
    const input = 'plainPassword';
    const error = new Error('Salt generation failed');

    (bcrypt.genSalt as jest.Mock).mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });

  it('should propagate errors thrown by bcrypt.hash', async () => {
    const input = 'plainPassword';
    const salt = 'randomSalt';
    const error = new Error('Hash generation failed');

    (bcrypt.genSalt as jest.Mock).mockResolvedValueOnce(salt);
    (bcrypt.hash as jest.Mock).mockRejectedValueOnce(error);

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
