import { Inject, Injectable } from '@nestjs/common';
import { IMovieService } from '@movie/service';
import { IMovieRepository } from '@movie/repository';
import { CreateMovieDTO, GetMovieResponseDTO, UpdateMovieDTO } from '@models/movie/dtos';
import { Movie } from '@models/movie/entities';
import axios from 'axios';

@Injectable()
export class MovieService implements IMovieService {
  constructor(@Inject(IMovieRepository) private readonly movieRepository: IMovieRepository) {}

  async createMovie(movie: CreateMovieDTO): Promise<Movie> {
    return this.movieRepository.create(movie);
  }

  async deleteMovie(id: string): Promise<Movie> {
    return this.movieRepository.deleteById(id);
  }

  async updateMovie(id: string, data: UpdateMovieDTO): Promise<Movie> {
    return this.movieRepository.update(id, data);
  }

  async getMovieById(id: string): Promise<Movie> {
    return this.movieRepository.findById(id);
  }

  async getAllMovies(): Promise<GetMovieResponseDTO[]> {
    const moviest = await this.movieRepository.findAll();

    return moviest.map((movie) => ({
      id: movie.id,
      title: movie.title,
    }));
  }

  async countMovies(): Promise<number> {
    return this.movieRepository.count();
  }

  async synchronizeMoviesData(): Promise<void> {
    const response = await axios.get(`${process.env.START_WARS_API_URL}/api/films`);

    if (response.status !== 200) {
      console.error('Failed to fetch movies from SWAPI');
      return;
    }

    await this.movieRepository.bulkUpsert(response.data.result);
  }
}
