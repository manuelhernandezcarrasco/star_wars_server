import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@user/controller';
import { IUserService, UserService } from '@user/service';
import { SignUpDTO, LogInDTO, LogInResponseDTO } from '@models/user/dtos';
import { User } from '@models/user/entities';
import { userRepositoryMock } from '../dummies/user.repository.mock';
import { authServiceMock } from '../dummies/auth.service.mock';
import { mockUser } from '../dummies/user.dummies';
import { logInResponseMock } from '../dummies';

describe('UserController', () => {
  let controller: UserController;
  let service: IUserService;

  beforeEach(async () => {
    service = new UserService(authServiceMock, userRepositoryMock);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: IUserService, useValue: service }],
    }).compile();

    controller = module.get(UserController);
  });

  describe('signUp', () => {
    it('should call service and return user', async () => {
      const dto: SignUpDTO = { email: 'test@mail.com', name: 'John Doe', password: '123456' };

      const result = await controller.signUp(dto);

      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('should call service and return login response', async () => {
      const dto: LogInDTO = { email: 'user@mail.com', password: '123456' };

      const result = await controller.login(dto);

      expect(result).toEqual(logInResponseMock);
    });
  });
});
