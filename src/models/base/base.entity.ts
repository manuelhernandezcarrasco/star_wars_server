import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  deletedAt?: Date;
}
