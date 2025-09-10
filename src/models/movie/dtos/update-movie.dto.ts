import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateMovieDTO {
  @ApiProperty({ example: 'A New Hope' })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'It is a period of civil war...' })
  @IsOptional()
  openingCrawl?: string;

  @ApiProperty({ example: 'George Lucas' })
  @IsOptional()
  director?: string;

  @ApiProperty({ example: 'Gary Kurtz' })
  @IsOptional()
  producer?: string;

  @ApiProperty({ example: '1977-05-25' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  releaseDate?: Date;

  @ApiProperty({ example: 'Some metadata' })
  @IsOptional()
  metadata?: string;
}
