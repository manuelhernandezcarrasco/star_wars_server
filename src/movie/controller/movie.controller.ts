import { CreateMovieDTO, GetMovieResponseDTO, UpdateMovieDTO } from '@models/movie/dtos';
import { Movie } from '@models/movie/entities';
import { IMovieService } from '@movie/service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { RolesGuard } from '@shared/guards';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('Authorization')
@ApiTags('Movies')
export class MovieController {
  constructor(@Inject(IMovieService) private readonly movieService: IMovieService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of movies',
    type: [GetMovieResponseDTO],
  })
  async getAllMovies(): Promise<GetMovieResponseDTO[]> {
    return this.movieService.getAllMovies();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Movie details',
    type: Movie,
  })
  async getMovieById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.getMovieById(id);
  }

  @Post()
  @UseGuards(RolesGuard(UserRole.ADMIN))
  @ApiCreatedResponse({
    description: 'Movie successfully created',
    type: Movie,
  })
  async createMovie(@Body() movie: CreateMovieDTO): Promise<Movie> {
    return this.movieService.createMovie(movie);
  }

  @Put('/:id')
  @UseGuards(RolesGuard(UserRole.ADMIN))
  @ApiOkResponse({
    description: 'Movie successfully updated',
    type: Movie,
  })
  async updateMovie(@Param('id') id: string, @Body() updateMovieDTO: UpdateMovieDTO): Promise<Movie> {
    return this.movieService.updateMovie(id, updateMovieDTO);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard(UserRole.ADMIN))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMovie(@Param('id') id: string): Promise<void> {
    await this.movieService.deleteMovie(id);
  }
}
