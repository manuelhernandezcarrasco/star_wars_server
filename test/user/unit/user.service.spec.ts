import { UserService } from '@user/service';
import { LogInDTO, SignUpDTO } from '@models/user/dtos';
import { authServiceMock, logInResponseMock, mockUser, userRepositoryMock } from '../dummies';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService(authServiceMock, userRepositoryMock);
  });

  it('should sign up a user', async () => {
    const signUpMock: SignUpDTO = {
      email: 'test@example.com',
      name: 'test',
      password: '123456',
    };

    const result = await service.signUp(signUpMock);

    expect(result).toEqual(mockUser);
  });

  it('should login a user', async () => {
    const loginMock: LogInDTO = {
      email: 'test@example.com',
      password: '123456',
    };

    const result = await service.login(loginMock);

    expect(result).toEqual(logInResponseMock);
  });
});
