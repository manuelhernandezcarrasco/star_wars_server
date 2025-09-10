import { LogInDTO, LogInResponseDTO, SignUpDTO } from '@models/user/dtos';
import { User } from '@models/user/entities';

export abstract class IUserService {
  abstract signUp(signUpDTO: SignUpDTO): Promise<User>;
  abstract login(loginDTO: LogInDTO): Promise<LogInResponseDTO>;
}
