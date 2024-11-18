import * as jwt from 'jsonwebtoken';
import { GenerateJwtTokenUsecase } from "@core/use-cases/generate-jwt-token-usecase.service";

jest.mock('jsonwebtoken');

describe('GenerateJwtTokenUsecase', () => {
  let sut: GenerateJwtTokenUsecase;

  beforeEach(() => {
    sut = new GenerateJwtTokenUsecase();
  });

  it('should generate a JWT token with the correct payload and secret', async () => {
    const input = {
      username: 'testuser',
      role: 'admin',
    };
    const token = 'generatedJwtToken';


    const result = await sut.execute(input);

    const expectedPayload = {
      username: input.username,
      role: input.role,
    };
    const expectedSecret =
      process.env.JWT_SECRET || 'D647EF968BA73FF93946ABF267587';

    expect(jwt.sign).toHaveBeenCalledWith(expectedPayload, expectedSecret);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if jwt.sign fails', async () => {
    const input = {
      username: 'testuser',
      role: 'admin',
    };
    const error = new Error('JWT signing error');

    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw error;
    });

    await expect(sut.execute(input)).rejects.toThrowError(error);
  });
});
