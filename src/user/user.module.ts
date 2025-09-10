import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { Auth0Service, IUserService, UserService } from '@user/service';
import { UserController } from '@user/controller';
import { IUserRepository, UserRepository } from '@user/repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy';

const userServiceProvider = {
  provide: IUserService,
  useClass: UserService,
};

const authServiceProvider = {
  provide: 'IAuthService',
  useClass: Auth0Service,
};

const userRepositoryProvider = {
  provide: IUserRepository,
  useClass: UserRepository,
};

@Module({
  imports: [SharedModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [authServiceProvider, userServiceProvider, userRepositoryProvider, JwtStrategy],
})
export class UserModule {}
