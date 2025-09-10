import { ApiProperty } from '@nestjs/swagger';

export class GetMovieResponseDTO {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'A New Hope' })
  title: string;
}
