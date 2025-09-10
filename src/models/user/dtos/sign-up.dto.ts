import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(6)
  name: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string;
}
