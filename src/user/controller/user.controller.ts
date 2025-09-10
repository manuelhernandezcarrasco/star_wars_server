import { LogInDTO, LogInResponseDTO, SignUpDTO } from '@models/user/dtos';
import { User } from '@models/user/entities';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { IUserService } from '@user/service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(@Inject(IUserService) private readonly userService: IUserService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: User,
  })
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<User> {
    return this.userService.signUp(signUpDTO);
  }

  @Post('login')
  @ApiCreatedResponse({
    description: 'User successfully logged in',
    type: LogInResponseDTO,
  })
  async login(@Body() loginDTO: LogInDTO): Promise<LogInResponseDTO> {
    return this.userService.login(loginDTO);
  }
}
