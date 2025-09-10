import { LogInDTO, LogInResponseDTO, SignUpDTO } from '@models/user/dtos';

export abstract class IAuthService {
  abstract signUpUser(user: SignUpDTO): Promise<string>;
  abstract loginUser(user: LogInDTO): Promise<LogInResponseDTO>;
}
