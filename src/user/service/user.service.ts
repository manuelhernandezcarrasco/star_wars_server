import { Inject, Injectable } from '@nestjs/common';
import { IAuthService, IUserService } from '@user/service';
import { LogInDTO, LogInResponseDTO, SignUpDTO } from '@models/user/dtos';
import { IUserRepository } from '@user/repository';
import { User } from '@models/user/entities';
import { BadRequestError } from '@shared/errors';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async login(loginDTO: LogInDTO): Promise<LogInResponseDTO> {
    const user = await this.userRepository.findByEmail(loginDTO.email);

    if (!user) throw new BadRequestError('Invalid credentials');

    return this.authService.loginUser(loginDTO);
  }

  async signUp(signUpDTO: SignUpDTO): Promise<User> {
    const userId: string = await this.authService.signUpUser(signUpDTO);

    const user = await this.userRepository.create({
      auth0Id: userId,
      email: signUpDTO.email,
      name: signUpDTO.name,
    });

    return user;
  }
}
