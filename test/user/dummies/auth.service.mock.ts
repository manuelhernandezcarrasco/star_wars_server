import { IAuthService } from '@user/service';

export const authServiceMock: IAuthService = {
  signUpUser: jest.fn().mockResolvedValue('auth0|123'),
  loginUser: jest.fn().mockResolvedValue({ accessToken: 'token', idToken: 'token' }),
};
