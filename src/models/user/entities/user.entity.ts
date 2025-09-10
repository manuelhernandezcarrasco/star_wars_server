import { BaseEntity } from '@models/base';
import { ApiProperty } from '@nestjs/swagger';

export class User extends BaseEntity {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'auth0|123456789' })
  auth0Id: string;
}
