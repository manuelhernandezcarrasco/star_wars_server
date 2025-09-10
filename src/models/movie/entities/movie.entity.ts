import { BaseEntity } from '@models/base';
import { ApiProperty } from '@nestjs/swagger';

export class Movie extends BaseEntity {
  @ApiProperty({ example: 'A New Hope' })
  title: string;
  @ApiProperty({ example: 'It is a period of civil war...' })
  openingCrawl: string;
  @ApiProperty({ example: 'George Lucas' })
  director: string;
  @ApiProperty({ example: 'Gary Kurtz' })
  producer: string;
  @ApiProperty({ example: '1977-05-25' })
  releaseDate: Date;

  @ApiProperty({ example: 'Some metadata', nullable: true })
  metadata: string | null;
}
