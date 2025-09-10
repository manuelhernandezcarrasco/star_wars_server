import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMovieDTO {
  @ApiProperty({ example: 'A New Hope' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'It is a period of civil war...' })
  @IsNotEmpty()
  openingCrawl: string;

  @ApiProperty({ example: 'George Lucas' })
  @IsNotEmpty()
  director: string;

  @ApiProperty({ example: 'Gary Kurtz' })
  @IsNotEmpty()
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  @Type(() => Date)
  @IsDate()
  releaseDate: Date;

  @ApiProperty({ example: 'Some metadata' })
  @IsOptional()
  metadata: string;
}
